import request from "supertest";

import { app } from "../config/app";

describe("async Body Parser Middleware", () => {
  it("Should sure parserBody is working ", async () => {
    app.post("/teste_parser_body", (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post("/teste_parser_body")
      .send({ name: "Pedro" })
      .expect({ name: "Pedro" });
  });
});
