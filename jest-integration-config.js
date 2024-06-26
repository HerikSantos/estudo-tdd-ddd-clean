const config = require("./jest.config");

module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
  preset: "@shelf/jest-mongodb",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
