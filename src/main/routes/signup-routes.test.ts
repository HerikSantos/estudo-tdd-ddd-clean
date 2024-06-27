// eslint-disable-next-line
import request from "supertest";

import { app } from "../config/app";

describe("Signup Routes", () => {
  it("Should return an account on success ", async () => {
    await request(app)
      .post("/signup")
      .send({
        name: "tico test",
        email: "ticotest@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      })
      .expect({ message: "Ok" });
  });
});
