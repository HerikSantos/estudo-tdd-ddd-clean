import { MissingParamError } from "../errors/missing-params-error";
import { badRequest } from "../helpers/ttp-helper";
import { type IController } from "./protocols/controller";
import { type IHttpRequest, type IHttpResponse } from "./protocols/http";

class SignupController implements IController {
  handle(httpRequest: IHttpRequest): IHttpResponse {
    const { name, email, password, passwordConfirmation } = httpRequest.body;

    if (!name) return badRequest(new MissingParamError("name"));

    if (!email) return badRequest(new MissingParamError("email"));

    if (!password) return badRequest(new MissingParamError("password"));

    if (!passwordConfirmation)
      return badRequest(new MissingParamError("passwordConfirmation"));

    return {
      statusCode: 200,
      body: "ok",
    };
  }
}

export { SignupController };
