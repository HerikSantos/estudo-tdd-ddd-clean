import {
  type IHttpRequest,
  type IHttpResponse,
  type IController,
  type IAddAcountUseCase,
  type IEmailValidator,
} from "../../controllers/singup/signup-protocols";
import {
  ServerError,
  InvalidParamError,
  MissingParamError,
} from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";

class SignupController implements IController {
  private readonly emailValidator: IEmailValidator;
  private readonly addAccountUseCase: IAddAcountUseCase;

  constructor(
    emailValidator: IEmailValidator,
    addAccountUseCase: IAddAcountUseCase,
  ) {
    this.emailValidator = emailValidator;
    this.addAccountUseCase = addAccountUseCase;
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

      const result = this.addAccountUseCase.add({ name, email, password });

      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      return serverError(new ServerError());
    }
  }
}

export { SignupController };
