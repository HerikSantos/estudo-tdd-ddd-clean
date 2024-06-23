import { type IEncrypter } from "../../protocols/encrypter";
import { DbAddAccountUseCase } from "./db-add-acount";

interface ISutTypes {
  encrypterStub: IEncrypter;
  sut: DbAddAccountUseCase;
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub {
    async encrypt(password: string): Promise<string> {
      return "hashed_password";
    }
  }

  return new EncrypterStub();
};

const makeSut = (): ISutTypes => {
  const encrypterStub = makeEncrypter();

  const sut = new DbAddAccountUseCase(encrypterStub);

  return {
    encrypterStub,
    sut,
  };
};

describe("DbAccount UseCase", () => {
  it("Should call encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const cryptSpy = jest.spyOn(encrypterStub, "encrypt");

    await sut.add(accountData);

    expect(cryptSpy).toHaveBeenCalledWith("valid_password");
  });

  it("Should ", async () => {
    const { sut, encrypterStub } = makeSut();
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const cryptSpy = jest.spyOn(encrypterStub, "encrypt");

    await sut.add(accountData);

    expect(cryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
