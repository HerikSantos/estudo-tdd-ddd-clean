import { type IAddAccountRepository } from "../../../../data/protocols/add-account-repository";
import {
  type IAddAccountModel,
  type IAccountModel,
} from "../../../../domain/useCases/add-accountUseCase";
import { mongoHelper } from "./helpers/mong-helper";

class AccountMongoRepository implements IAddAccountRepository {
  async add(account: IAddAccountModel): Promise<IAccountModel> {
    const accountColection = mongoHelper.getDbCollection("accounts");
    if (!accountColection) throw new Error("CAAIU O BD FUDEU");

    const { insertedId } = await accountColection.insertOne(account);

    const result = await accountColection.findOne<IAccountModel>({
      _id: insertedId,
    });

    if (!result) throw new Error("User not found");

    return result;
  }
}
export { AccountMongoRepository };
