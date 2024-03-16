import { Request, Response } from "express";
import { IUser } from "../../databases/mongodb/model/user.model";
import UserModel from "../../databases/mongodb/schema/user.schema";
import tryCatchFn from "../../middleware/tryCatch";

export const createUser = tryCatchFn(async (req: Request, res: Response) => {
  const newUser = new UserModel();
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  await newUser.save();
  res.status(201).send(newUser);
});

export const getUsers = tryCatchFn(async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.send(users);
});

export const getUser = tryCatchFn(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingUser = await UserModel.findById(id);

  if (!existingUser) {
    return res
      .status(404)
      .send({ message: `User with id: ${id} was not found.` });
  }

  res.send(existingUser);
});

export const updateUser = tryCatchFn(async (req: Request, res: Response) => {
  const { id } = req.params;

  const changes: Partial<IUser> = req.body;

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: id },
    { $set: { ...changes } },
    { new: true }
  );

  if (!updatedUser) {
    return res
      .status(404)
      .send({ message: `User with id: ${id} was not found.` });
  }

  res.send(updatedUser);
});

export const changePassword = tryCatchFn(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { password: req.body.new_password } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: `User with id: ${id} was not found.` });
    }

    res.send(updatedUser);
  }
);

export const deleteUser = tryCatchFn(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingUser = await UserModel.findById(id);

  if (!existingUser) {
    return res
      .status(404)
      .send({ message: `User with id: ${id} was not found.` });
  }

  await UserModel.deleteOne({ _id: id });

  res.send({ message: "User removed!" });
});
