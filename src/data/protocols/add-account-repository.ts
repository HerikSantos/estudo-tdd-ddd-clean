import {
  type IAddAccountModel,
  type IAccountModel,
} from "../useCases/add-account/db-add-accounts-protocols";

interface IAddAccountRepository {
  add: (account: IAddAccountModel) => Promise<IAccountModel>;
}

export type { IAddAccountRepository };
