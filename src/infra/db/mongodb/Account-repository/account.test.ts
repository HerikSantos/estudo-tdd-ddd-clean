import { env } from "../../../../enviroment";
import { AccountMongoRepository } from "./account";
import { mongoHelper } from "./helpers/mong-helper";

describe("Account Mongo Repository", () => {
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

  it("Should return an account on success", async () => {
    const sut = new AccountMongoRepository();
    const account = await sut.add({
      name: "teste_name",
      email: "teste@gmail.com",
      password: "teste123",
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe("teste_name");
    expect(account.email).toBe("teste@gmail.com");
    expect(account.password).toBe("teste123");
  });
});
