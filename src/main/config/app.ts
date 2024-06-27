import express from "express";

import { middlewares } from "./middleware";

export const app = express();

middlewares(app);
