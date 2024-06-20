import { InvalidParamError } from "../errors/invalid-params-error";
import { MissingParamError } from "../errors/missing-params-error";
import { type IEmailValidator } from "./protocols/email-validator";
import { SignupController } from "./signupController";

interface ISutTypes {
  sut: SignupController;
  emailValidatorStub: IEmailValidator;
}

const makeSut = (): ISutTypes => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignupController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe("Signup Controller", () => {
  it("Should return 400 if no name if provider", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("Should return 400 if no email if provider", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  it("Should return 400 if no password if provider", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  it("Should return 400 if no passwordConfirmation if provider", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation"),
    );
  });

  it("Should return 400 if an invalid email is provider", () => {
    const { sut, emailValidatorStub } = makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });
});
