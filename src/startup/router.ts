import { Express, NextFunction, Request, Response } from "express";

import typeormItemRouter from "../controllers/typeorm/item.controller";
import mongooseUsersRouter from "../routes/user.routes";
import { AppError } from "../middleware/app-error";

// base router where all links to other routers are going to be setup
function routerSetup(app: Express) {
  app
    .get("/", async function (req: Request, res: Response) {
      res.send("Hello express");
    })
    .use("/api/users", mongooseUsersRouter)
    .use("/api/items", typeormItemRouter)

    .use("*", function (req: Request, res: Response) {
      res.status(404).json({
        message: `Can't find ${req.originalUrl}`,
      });
    })

    .use(function (
      err: AppError,
      req: Request,
      res: Response,
      next: NextFunction
    ): void {
      err.status = err.status || "fail";
      err.statusCode = err.statusCode || 500;

      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
    });
}

export default routerSetup;
