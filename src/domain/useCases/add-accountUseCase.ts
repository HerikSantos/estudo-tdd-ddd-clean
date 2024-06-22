import { type IAccountModel } from "./models/account";

interface IAddAccountModel {
  name: string;
  email: string;
  password: string;
}

interface IAddAcountUseCase {
  add: (account: IAddAccountModel) => Promise<IAccountModel>;
}

export type { IAccountModel, IAddAccountModel, IAddAcountUseCase };
