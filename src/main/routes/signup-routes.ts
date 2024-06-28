import { type Router } from "express";

import { adpterRoute } from "../adaptres/express-route-adpter";
import { makeSignupController } from "../factories/signup";

function signupRoute(router: Router): void {
  router.post("/signup", adpterRoute(makeSignupController()));
}

export { signupRoute };
