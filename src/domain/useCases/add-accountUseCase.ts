import { type IAccountModel } from "./models/account";

interface IAddAccountModel {
  name: string;
  email: string;
  password: string;
}

interface IAddAcountUseCase {
  add: (account: IAddAccountModel) => IAccountModel;
}

export type { IAccountModel, IAddAccountModel, IAddAcountUseCase };
