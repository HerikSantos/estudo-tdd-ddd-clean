import { InvalidParamError } from "../errors/invalid-params-error";
import { MissingParamError } from "../errors/missing-params-error";
import { badRequest } from "../helpers/ttp-helper";
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

    if (!name) return badRequest(new MissingParamError("name"));

    if (!email) return badRequest(new MissingParamError("email"));

    if (!password) return badRequest(new MissingParamError("password"));

    if (!passwordConfirmation)
      return badRequest(new MissingParamError("passwordConfirmation"));

    if (!this.emailValidator.isValid(email))
      return badRequest(new InvalidParamError("email"));

    return {
      statusCode: 200,
      body: "ok",
    };
  }
}

export { SignupController };
