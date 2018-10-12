let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-router.js";
    break;
  case "umd":
    mappedModule = "<rootDir>/dist/curi-router.umd.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
}

module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.spec.ts"],
  globals: {
    "ts-jest": {
      module: "es6",
      diagnostics: false
    }
  },
  testURL: "http://localhost",
  moduleNameMapper: {
    "@curi/router": mappedModule
  }
};
