import { DbAddAccountUseCase } from "../../data/useCases/add-account/db-add-acount";
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/Account-repository/account";
import { SignupController } from "../../presentation/controllers/singup/signupController";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";

function makeSignupController(): SignupController {
  const addAccountRepository = new AccountMongoRepository();
  const encrypter = new BcryptAdapter(10);
  const emailValidator = new EmailValidatorAdapter();
  const addAccountUseCase = new DbAddAccountUseCase(
    encrypter,
    addAccountRepository,
  );
  return new SignupController(emailValidator, addAccountUseCase);
}

export { makeSignupController };
