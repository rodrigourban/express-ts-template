import { Router } from "express";

import {
  changePassword,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/mongoose/user.controller";
import {
  changePasswordValidator,
  createUserValidator,
  getUserByIdValidator,
  updateUserValidator,
} from "../middleware/user-validator.middleware";

const controller = Router();

controller

  .post("/", createUserValidator, createUser)

  .get("/", getUserByIdValidator, getUsers)

  .get("/:id", getUserByIdValidator, getUser)

  .patch("/:id", getUserByIdValidator, updateUserValidator, updateUser)
  .patch(
    "/change-password/:id",
    getUserByIdValidator,
    changePasswordValidator,
    changePassword
  )

  .delete("/:id", getUserByIdValidator, deleteUser);

export default controller;
