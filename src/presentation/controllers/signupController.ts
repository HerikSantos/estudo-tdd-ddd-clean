import { ServerError } from "../errors/internal-server-error";
import { InvalidParamError } from "../errors/invalid-params-error";
import { MissingParamError } from "../errors/missing-params-error";
import { badRequest, serverError } from "../helpers/ttp-helper";
import { type IController } from "./protocols/controller";
import { type IEmailValidator } from "./protocols/email-validator";
import { type IHttpRequest, type IHttpResponse } from "./protocols/http";

class SignupController implements IController {
  private readonly emailValidator: IEmailValidator;

  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: IHttpRequest): IHttpResponse {
    const {
      name,
      email,
      password,
      passwordConfirmation,
    }: {
      name: string;
      email: string;
      password: string;
      passwordConfirmation: string;
    } = httpRequest.body;

    try {
      if (!name) return badRequest(new MissingParamError("name"));

      if (!email) return badRequest(new MissingParamError("email"));

      if (!password) return badRequest(new MissingParamError("password"));

      if (!passwordConfirmation)
        return badRequest(new MissingParamError("passwordConfirmation"));

      if (!this.emailValidator.isValid(email))
        return badRequest(new InvalidParamError("email"));

      if (passwordConfirmation !== password)
        return badRequest(new InvalidParamError("passwordConfirmation"));

      return {
        statusCode: 200,
        body: "ok",
      };
    } catch (error) {
      return serverError(new ServerError());
    }
  }
}

export { SignupController };
