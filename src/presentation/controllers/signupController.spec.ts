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
  });
});
