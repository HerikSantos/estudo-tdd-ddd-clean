// eslint-disable-next-line
import request from "supertest";

import { env } from "../../enviroment";
import { mongoHelper } from "../../infra/db/mongodb/Account-repository/helpers/mong-helper";
import { app } from "../config/app";

describe("Signup Routes", () => {
  beforeAll(async () => {
    try {
      await mongoHelper.connect(env.MONGO_URL);
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = mongoHelper.getDbCollection("accounts");

    await accountCollection?.deleteMany({});
  });

  it("Should return an account on success ", async () => {
    await request(app)
      .post("/signup")
      .send({
        name: "tico test",
        email: "ticotest@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      })
      .expect(200);
  });
});
