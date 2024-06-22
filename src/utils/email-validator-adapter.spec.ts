import validator from "validator";

import { EmailValidatorAdapter } from "./email-validator";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe("Email validator", () => {
  it("Should return false if validator retuns false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);

    const isValid = sut.isValid("invalid_email.com");
    expect(isValid).toBeFalsy();
  });

  it("Should return true if validator retuns true", () => {
    const sut = makeSut();

    const isValid = sut.isValid("valid_email@gmail.com");
    expect(isValid).toBeTruthy();
  });

  it("Should return true if validator retuns true", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");

    sut.isValid("valid_email@gmail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("valid_email@gmail.com");
  });
});
