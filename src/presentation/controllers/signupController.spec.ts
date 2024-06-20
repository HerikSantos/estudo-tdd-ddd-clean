import { MissingParamError } from "../errors/missing-params-error";
import { SignupController } from "./signupController";

describe("Signup Controller", () => {
  it("Should return 400 if no name if provider", () => {
    const sut = new SignupController();
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
    const sut = new SignupController();
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
    const sut = new SignupController();
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
    const sut = new SignupController();
    const httpRequest = {
      body: {
        email: "teste@gmail.com",
        name: "teste da silva",
        passwordConfirmation: "teste123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation"),
    );
  });
});
