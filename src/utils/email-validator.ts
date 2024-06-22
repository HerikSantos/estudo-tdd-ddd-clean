import validator from "validator";

import { type IEmailValidator } from "../presentation/protocols/email-validator";

class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}

export { EmailValidatorAdapter };
