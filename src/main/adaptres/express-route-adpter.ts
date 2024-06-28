import { type Request, type Response } from "express";

import {
  type IController,
  type IHttpRequest,
} from "../../presentation/protocols";

function adpterRoute(controller: IController) {
  return async (request: Request, response: Response) => {
    console.log(request.body);

    const httpRequest: IHttpRequest = {
      body: request.body,
    };

    const httpResponse = await controller.handle(httpRequest);

    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
}

export { adpterRoute };
