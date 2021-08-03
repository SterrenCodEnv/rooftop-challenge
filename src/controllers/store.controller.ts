import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Store } from '../entities/Store';


export const getAllStores = async (req: Request, res: Response) => {
    await getRepository(Store)
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

export const getStores = async (req: Request, res: Response) => {
    const { page, name } = req.query;
    const initialPosition: number = (Number(page) * 10) - 10; 
    if(!name){
        await getRepository(Store).findAndCount({ 
            skip: initialPosition, 
            take: 10 
        }).then((data) => {
            res.status(201).json({
                data: data,
            });
          })
          .catch((err) => {
            res.status(422).json({
              message: err,
            });
          }); 
    }else{
        await getRepository(Store).findAndCount({ 
            where: {name: Like(`%${name}%`)},
            skip: initialPosition, 
            take: 10 
        }).then((data) => {
            res.status(201).json({
                data: data,
            });
          })
          .catch((err) => {
            res.status(422).json({
              message: err,
            });
          }); 
    }    
};

export const createStore = async (req: Request, res: Response) => {
  const newStore = await getRepository(Store).create({
    name: req.body.name,
    address: req.body.address,
  });
  await getRepository(Store)
    .save(newStore)
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


export const deleteStore = async (req: Request, res: Response) => {
  const id = req.params.id;
  const store = await getRepository(Store).findOne(id);
    if(store){
        await getRepository(Store).delete(id).then((data) => {
            res.status(201).json({
                message: 'Success! Store delete',
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
        message: 'Store is not exist',
      });
    }
};