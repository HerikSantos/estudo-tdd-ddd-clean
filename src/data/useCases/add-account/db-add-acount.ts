import {
  type IAddAccountRepository,
  type IAccountModel,
  type IAddAccountModel,
  type IAddAcountUseCase,
  type IEncrypter,
} from "./db-add-accounts-protocols";
class DbAddAccountUseCase implements IAddAcountUseCase {
  private readonly encrypter: IEncrypter;
  private readonly addAccountRepository: IAddAccountRepository;

  constructor(
    encrypter: IEncrypter,
    addAccountRepository: IAddAccountRepository,
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashed_password = await this.encrypter.encrypt(accountData.password);

    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashed_password }),
    );

    console.log(account);

    return account;
  }
}

export { DbAddAccountUseCase };
