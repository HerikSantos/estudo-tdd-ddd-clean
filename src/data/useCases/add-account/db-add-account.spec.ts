import { DbAddAccountUseCase } from "./db-add-acount";

describe("DbAccount UseCase", () => {
  it("Should call encrypter with correct password", async () => {
    class EncrypterStub {
      async encrypt(password: string): Promise<string> {
        return "hashed_password";
      }
    }
    const escrypterStub = new EncrypterStub();
    const sut = new DbAddAccountUseCase(escrypterStub);
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const cryptSpy = jest.spyOn(escrypterStub, "encrypt");

    await sut.add(accountData);

    expect(cryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
