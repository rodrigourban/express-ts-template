import cors from 'cors'
import { Express } from "express";

function securitySetup(app: Express, express: any) {
    // here you can setup all security related stuff like headers, cors, rate-limiters
    app.use(cors())
    .use(express.json()) // allows parsing https body to json
}

export default securitySetup;