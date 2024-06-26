import { type IAddAccountRepository } from "../../../../data/protocols/add-account-repository";
import {
  type IAddAccountModel,
  type IAccountModel,
} from "../../../../domain/useCases/add-accountUseCase";
import { mongoHelper } from "./helpers/mong-helper";

interface IReturnFind {
  _id: string;
  name: string;
  email: string;
  password: string;
}

class AccountMongoRepository implements IAddAccountRepository {
  async add(account: IAddAccountModel): Promise<IAccountModel> {
    const accountColection = mongoHelper.getDbCollection("accounts");
    if (!accountColection) throw new Error("CAAIU O BD FUDEU");

    const { insertedId } = await accountColection.insertOne(account);

    const result = await accountColection.findOne<IReturnFind>({
      _id: insertedId,
    });

    if (!result) throw new Error("User not found");

    const { _id, ...accountWithoutId } = result;

    return Object.assign({}, accountWithoutId, { id: _id });
  }
}
export { AccountMongoRepository };
