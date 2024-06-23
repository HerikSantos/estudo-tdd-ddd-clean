import bcrypt from "bcryptjs";

import { type IEncrypter } from "../../data/protocols/encrypter";

class BcryptAdapter implements IEncrypter {
  private readonly salt: number;
  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(password: string): Promise<string> {
    const hashed_password = await bcrypt.hash(password, this.salt);

    return hashed_password;
  }
}

export { BcryptAdapter };
