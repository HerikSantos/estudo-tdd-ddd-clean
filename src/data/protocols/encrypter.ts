interface IEncrypter {
  encrypt: (password: string) => Promise<string>;
}

export type { IEncrypter };
