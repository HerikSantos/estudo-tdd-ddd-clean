import { type Router } from "express";

function signupRoute(router: Router): void {
  router.post("/signup", (request, response) => {
    return response.json({
      message: "Ok",
    });
  });
}

export { signupRoute };
