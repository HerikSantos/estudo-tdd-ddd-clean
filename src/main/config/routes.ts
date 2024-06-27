import { Router, type Express } from "express";

import { signupRoute } from "../routes/signup-routes";

function route(app: Express): void {
  const router = Router();
  app.use(router);
  signupRoute(router);
}

export { route };
