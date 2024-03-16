import dotenv from "dotenv";
import express from "express";

import appSetup from "./startup/init";
import routerSetup from "./startup/router";
import securitySetup from "./startup/security";

dotenv.config(); // you can use your .env variables in process.env
const app = express();
app.use(express.static("public"));

appSetup(app);
securitySetup(app, express);
routerSetup(app);

export default app;
