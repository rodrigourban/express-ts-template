import { validateOrReject } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";

import {
  CreateItemValidationSchema,
  GetItemIdValidationSchema,
  UpdateItemValidationSchema,
} from "../validators/item.class.validator";
import { ItemEntity } from "../databases/postgresql/entity/item.entity";

export const createItemValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }

    // we could also do this instead of manual mapping each field
    // const item = plainToClass(CreateItemValidationSchema, req.body);
    const item = new CreateItemValidationSchema();
    item.name = req.body.name;
    item.image = req.body.image;
    item.price = req.body.price;
    item.description = req.body.description;

    // checks a item instance against the schema validations
    await validateOrReject(item);

    // mapping CreateItemValidationSchema instance to ItemEntity instance
    req.body = plainToClass(ItemEntity, item);

    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};

export const updateItemValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params?.id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }

    const item = new UpdateItemValidationSchema();
    item.name = req.body.name;
    item.image = req.body.image;
    item.price = req.body.price;
    item.description = req.body.description;

    await validateOrReject(item);

    // mapping UpdateItemValidationSchema instance to ItemEntity instance
    req.body = plainToClass(ItemEntity, item);

    next();
  } catch (e: any) {
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};

export const getItemByIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params?.id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    const item = new GetItemIdValidationSchema();
    item.id = Number(req.params.id);

    await validateOrReject(item);

    next();
  } catch (e: any) {
    // extract generated message from the errors array
    const message = Object.values(e[0].constraints)[0];
    res.status(400).send({ message });
  }
};
