import { type IHttpResponse } from "../controllers/protocols/http";

const badRequest = (err: Error): IHttpResponse => {
  const retorno = {
    statusCode: 400,
    body: err,
  };

  return retorno;
};

const serverError = (err: Error): IHttpResponse => {
  const retorno = {
    statusCode: 500,
    body: err,
  };

  return retorno;
};

export { badRequest, serverError };
