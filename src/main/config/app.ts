import express from "express";

import { middlewares } from "./middleware";
import { route } from "./routes";

export const app = express();

middlewares(app);
route(app);
