import {
  type IAccountModel,
  type IAddAccountModel,
} from "../../../domain/useCases/add-accountUseCase";
import {
  type IEncrypter,
  type IAddAccountRepository,
} from "./db-add-accounts-protocols";
import { DbAddAccountUseCase } from "./db-add-acount";

interface ISutTypes {
  encrypterStub: IEncrypter;
  sut: DbAddAccountUseCase;
  addAccountRepositoryStub: IAddAccountRepository;
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub {
    async encrypt(password: string): Promise<string> {
      return "hashed_password";
    }
  }

  return new EncrypterStub();
};

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add(account: IAddAccountModel): Promise<IAccountModel> {
      const accountModel = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: "hashed_password",
      };

      return accountModel;
    }
  }
  return new AddAccountRepositoryStub();
};

const makeSut = (): ISutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();

  const sut = new DbAddAccountUseCase(encrypterStub, addAccountRepositoryStub);

  return {
    encrypterStub,
    sut,
    addAccountRepositoryStub,
  };
};

describe("DbAccount UseCase", () => {
  // it("Should call encrypter with correct password", async () => {
  //   const { sut, encrypterStub } = makeSut();
  //   const accountData = {
  //     name: "valid_name",
  //     email: "valid_email",
  //     password: "valid_password",
  //   };

  //   const cryptSpy = jest.spyOn(encrypterStub, "encrypt");

  //   await sut.add(accountData);

  //   expect(cryptSpy).toHaveBeenCalledWith("valid_password");
  // });

  // it("Should throws if Encrypter throws", async () => {
  //   await expect(async () => {
  //     const { sut, encrypterStub } = makeSut();
  //     const accountData = {
  //       name: "valid_name",
  //       email: "valid_email",
  //       password: "valid_password",
  //     };

  //     jest.spyOn(encrypterStub, "encrypt").mockImplementationOnce(() => {
  //       throw new Error();
  //     });

  //     await sut.add(accountData);
  //   }).rejects.toThrow();
  // });

  it("Should call addAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });
});
