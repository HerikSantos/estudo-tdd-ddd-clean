import { type Express } from "express";

import { bodyParser } from "../middlewares/body-parser-middleware";

function middlewares(app: Express): void {
  app.use(bodyParser);
}

export { middlewares };
