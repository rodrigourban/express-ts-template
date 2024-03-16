import { Express } from "express";
import typeORMConnect from "../databases/postgresql/typeorm";
import mongooseConnect from "../databases/mongodb/mongodb";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";

async function appSetup(app: Express) {
  try {
    // for both databases
    // await Promise.all([
    //     typeORMConnect(),
    //     mongooseConnect(),
    // ])

    // postgresql only
    //await typeORMConnect()

    // mongo only
    await mongooseConnect();

    console.log("Database connected succesfully!");

    const APP_PORT = process.env.APP_PORT || 3000;

    app.use(morgan("tiny"));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

    app.listen(APP_PORT, function () {
      console.log(`Server running on port ${APP_PORT}`);
    });
  } catch (error: unknown) {
    console.log("Unable to start the app!");
    console.error(error);
  }
}

export default appSetup;
