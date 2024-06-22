import {
  type IAccountModel,
  type IAddAccountModel,
  type IAddAcountUseCase,
  type IEmailValidator,
} from "../../../presentation/controllers/singup/signup-protocols";
import {
  ServerError,
  InvalidParamError,
  MissingParamError,
} from "../../errors";
import { SignupController } from "./signupController";

const makeAddAccountUseCase = async (): Promise<IAddAcountUseCase> => {
  class AddAccountStub implements IAddAcountUseCase {
    async add(account: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount: IAccountModel = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@gmail.com",
        password: "valid_password",
      };

      return fakeAccount;
    }
  }

  return new AddAccountStub();
};

interface ISutTypes {
  sut: SignupController;
  emailValidatorStub: IEmailValidator;
  addAccountUseCase: IAddAcountUseCase;
}

const makeSut = async (): Promise<ISutTypes> => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const addAccountUseCase = await makeAddAccountUseCase();
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignupController(emailValidatorStub, addAccountUseCase);
  return {
    sut,
    emailValidatorStub,
    addAccountUseCase,
  };
};

describe("Signup Controller", () => {
  it("Should return 400 if no name if provider", async () => {
    const { sut } = await makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("Should return 400 if no email if provider", async () => {
    const { sut } = await makeSut();
    const httpRequest = {
      body: {
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  it("Should return 400 if no password if provider", async () => {
    const { sut } = await makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  it("Should return 400 if no passwordConfirmation if provider", async () => {
    const { sut } = await makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation"),
    );
  });

  it("Should return 400 if an invalid email is provider", async () => {
    const { sut, emailValidatorStub } = await makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  it("Should return 200 if valid data is success", async () => {
    const { sut } = await makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "valid_email@gmail.com",
      password: "valid_password",
    });
  });

  it("Should call Email Validator with correct email", async () => {
    const { sut, emailValidatorStub } = await makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith("teste@gmail.com");
  });

  it("Should return 500 if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = await makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("Should return 400 if passwordConfirmation is different password", async () => {
    const { sut } = await makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "invalid_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation"),
    );
  });

  it("Should return 500 if AddAccountUseCase throws", async () => {
    const { sut, addAccountUseCase } = await makeSut();

    jest.spyOn(addAccountUseCase, "add").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("Should return 400 if passwordConfirmation is different password", async () => {
    const { sut } = await makeSut();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "invalid_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation"),
    );
  });

  it("Should call AddAccountUseCase with correct values", async () => {
    const { sut, addAccountUseCase } = await makeSut();
    const addSpy = jest.spyOn(addAccountUseCase, "add");
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        password: "teste123",
        passwordConfirmation: "teste123",
      },
    };

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith({
      email: "teste@gmail.com",
      name: "teste da silva",
      password: "teste123",
    });
  });
});
