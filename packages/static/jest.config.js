let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-static.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index.ts";
}

module.exports = {
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.spec.ts"],
  transform: {
    "\\.ts$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      module: "es6"
    }
  },
  testURL: "http://localhost",
  moduleNameMapper: {
    "@curi/static": mappedModule
  }
};
