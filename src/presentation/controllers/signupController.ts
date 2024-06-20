import { MissingParamError } from "../errors/missing-params-error";
import { type IHttpRequest, type IHttpResponse } from "./protocols/http";

class SignupController {
  handle(httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name)
      return {
        statusCode: 400,
        body: new MissingParamError("name"),
      };

    if (!httpRequest.body.email)
      return {
        statusCode: 400,
        body: new MissingParamError("email"),
      };

    return {
      statusCode: 200,
      body: "ok",
    };
  }
}

export { SignupController };
