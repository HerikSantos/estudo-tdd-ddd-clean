import { EmailValidatorAdapter } from "./email-validator";

describe("Email validator", () => {
  it("Should return false if validator retuns false", () => {
    const sut = new EmailValidatorAdapter();

    const isValid = sut.isValid("invalid_email.com");
    expect(isValid).toBeFalsy();
  });
});
