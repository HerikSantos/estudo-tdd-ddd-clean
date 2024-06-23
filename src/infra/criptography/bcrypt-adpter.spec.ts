import bcrypt from "bcryptjs";

import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcryptjs", () => ({
  async hash(): Promise<string> {
    return await new Promise((resolve) => {
      resolve("hash");
    });
  },
}));

describe("Example Test Suite", () => {
  it("Should call bcrypt with correct value", async () => {
    const salt = 10;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");

    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  it("Should return a hash on success", async () => {
    const salt = 10;
    const sut = new BcryptAdapter(salt);
    const hashed_password = await sut.encrypt("any_value");

    expect(hashed_password).toBe("hash");
  });
});
