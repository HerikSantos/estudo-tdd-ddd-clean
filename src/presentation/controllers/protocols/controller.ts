import { type IHttpRequest, type IHttpResponse } from "./http";

interface IController {
  handle: (httpRequest: IHttpRequest) => IHttpResponse;
}

export type { IController };
