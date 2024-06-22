import { type IHttpRequest, type IHttpResponse } from "./http";

interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>;
}

export type { IController };
