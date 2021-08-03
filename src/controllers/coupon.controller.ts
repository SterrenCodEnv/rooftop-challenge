import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Coupon } from '../entities/Coupon';

export const getCoupons = async (req: Request, res: Response) => {
  await getRepository(Coupon)
    .find()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

export const getCouponByEmail = async (req: Request, res: Response) => {
  const { email, code } = req.query;
  await getRepository(Coupon)
    .find({ where: { customerEmail: email, code: code } })
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};

export const createCoupon = async (req: Request, res: Response) => {
  const newCoupon = await getRepository(Coupon).create({
    code: req.body.code,
    expiresAt: req.body.expires_at,
  });
  await getRepository(Coupon)
    .save(newCoupon)
    .then((data) => {
      res.status(201).json({
        data: data,
      });
    })
    .catch((err) => {
      res.status(422).json({
        message: err,
      });
    });
};

export const updateCoupon = async (req: Request, res: Response) => {
  const { email } = req.body;
  const id = req.params.id;
  const existAssignedEmail = await getRepository(Coupon).find({
    where: { customerEmail: email },
  });

  if (existAssignedEmail.length > 0) {
    res.status(422).json({
        message: 'Email already assigned in a coupon',
      });
  } 
  const coupon = await getRepository(Coupon).findOne(id);
  if(coupon){
    let updateCoupon: Coupon = coupon;
    updateCoupon.customerEmail = email.toLowerCase();
    updateCoupon.assignedAt = new Date();
    getRepository(Coupon).merge(coupon, updateCoupon);
    await getRepository(Coupon).save(coupon).then((data) => {
      res.status(201).json({
        message: 'Success! Coupon update, emails assigned',
        data: data,
      });
    })
    .catch((err) => {
      res.status(422).json({
        message: err,
      });
    });
  }else{
      res.status(404).json({
        message: 'Coupon is not exist',
      });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  const id = req.params.id;
  const coupon = await getRepository(Coupon).findOne(id);
    if(coupon){
      if(!coupon.customerEmail){
        await getRepository(Coupon).delete(id).then((data) => {
          res.status(201).json({
            message: 'Success! Coupon delete',
            data: data,
          });
        })
        .catch((err) => {
          res.status(422).json({
            message: err,
          });
        });
      }else{
        res.status(404).json({
          message: 'Coupon not delete, assigned email',
        });
      }
    }else{
      res.status(404).json({
        message: 'Coupon is not exist',
      });
    }
};