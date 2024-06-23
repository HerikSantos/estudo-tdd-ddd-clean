import {
  type IAccountModel,
  type IAddAccountModel,
  type IAddAcountUseCase,
  type IEncrypter,
} from "./db-add-accounts-protocols";
class DbAddAccountUseCase implements IAddAcountUseCase {
  private readonly encrypter: IEncrypter;

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }

  async add(account: IAddAccountModel): Promise<IAccountModel> {
    const { password } = account;

    const accountModel = {
      id: "any",
      name: "any",
      email: "any",
      password: "any",
    };

    await this.encrypter.encrypt(password);

    return accountModel;
  }
}

export { DbAddAccountUseCase };
