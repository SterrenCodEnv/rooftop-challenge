import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Coupon } from '../entities/Coupon';

export const existingCoupons = async (req: Request, res: Response) => {
  await getRepository(Coupon)
    .count()
    .then((data) => {
      res.status(201).json({
        message: 'Total amount of existing coupons:',
        data: data,
      });
    })
    .catch((err) => {
      res.status(422).json({
        message: err,
      });
    });
};

export const assignedCoupons = async (req: Request, res: Response) => {
  await getRepository(Coupon)
    .createQueryBuilder('coupon')
    .where('coupon.customer_email is not null')
    .getCount()
    .then((data) => {
      res.status(201).json({
        message: 'Total amount of assigned coupons:',
        data: data,
      });
    })
    .catch((err) => {
      res.status(422).json({
        message: err,
      });
    });
};

export const unassignedCoupons = async (req: Request, res: Response) => {
  await getRepository(Coupon)
    .createQueryBuilder('coupon')
    .where('coupon.customer_email is null')
    .getCount()
    .then((data) => {
      res.status(201).json({
        message: 'Total amount of unassigned coupons:',
        data: data,
      });
    })
    .catch((err) => {
      res.status(422).json({
        message: err,
      });
    });
};

export const createdsPerDay = async (req: Request, res: Response) => {};

export const assignedsPerDay = async (req: Request, res: Response) => {
  try {
    let assignedCoupons = await getRepository(Coupon)
      .createQueryBuilder('coupon')
      .where('coupon.customer_email is not null')
      .getMany();

    let dateList = assignedCoupons.map((x) => {
      const year = x.assignedAt.getFullYear();
      const month = x.assignedAt.getMonth();
      const day = x.assignedAt.getDate();
      const date = `${year}-${month}-${day}`;
      return date;
    });

    dateList.sort().reverse();
    
    let data = dateList.reduce(
      (a, c) => ((a[c] = (a[c] || 0) + 1), a),
      Object.create(null)
    );

    res.status(201).json({
      message: 'Coupons assigned per day',
      data,
    });
  } catch (err) {
    res.status(422).json({
      message: err,
    });
  }
};
