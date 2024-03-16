import { Router, Request, Response } from "express";
import { useTypeORM } from "../../databases/postgresql/typeorm";
import { ItemEntity } from "../../databases/postgresql/entity/item.entity";
import {
  createItemValidator,
  getItemByIdValidator,
  updateItemValidator,
} from "../../middleware/item-validator.middleware";
const controller = Router();

controller

  .post("/", createItemValidator, async (req: Request, res: Response) => {
    try {
      const newItem = await useTypeORM(ItemEntity).save(req.body);
      res.status(201).send(newItem);
    } catch (e: unknown) {
      res.status(500).send({ message: "Unable to save entry to DB!" });
    }
  })

  .get("/", async (req: Request, res: Response) => {
    try {
      const items = await useTypeORM(ItemEntity).find();
      res.send(items);
    } catch (e: unknown) {
      res.status(500).send({ message: "Unable to retrieve data from DB!" });
    }
  })

  .get("/:id", getItemByIdValidator, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingItem = await useTypeORM(ItemEntity).findOneBy({ id });

      if (!existingItem) {
        return res
          .status(404)
          .send({ message: `Item with id: ${id} was not found.` });
      }

      res.send(existingItem);
    } catch (e: unknown) {
      res.status(500).send({ message: "Unable to retrieve data from DB!" });
    }
  })

  .patch(
    "/:id",
    getItemByIdValidator,
    updateItemValidator,
    async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const existingItem = await useTypeORM(ItemEntity).findOneBy({ id });

        if (!existingItem) {
          return res
            .status(404)
            .send({ message: `Item with id: ${id} was not found.` });
        }

        const changes: Partial<ItemEntity> = req.body;
        const itemChanges = { ...existingItem, ...changes };

        const updatedItem = await useTypeORM(ItemEntity).save(itemChanges);

        res.send(updatedItem);
      } catch (e: unknown) {
        res.status(500).send({ message: "Unable to update entry in DB!" });
      }
    }
  )

  .delete("/:id", getItemByIdValidator, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existingItem = await useTypeORM(ItemEntity).findOneBy({ id });

      if (!existingItem) {
        return res
          .status(404)
          .send({ message: `Item with id: ${id} was not found.` });
      }

      await useTypeORM(ItemEntity).remove(existingItem);
      res.send({ message: "Item removed!" });
    } catch (e: unknown) {
      res.status(500).send({ message: "Unable to delete entry from DB!" });
    }
  });

export default controller;
