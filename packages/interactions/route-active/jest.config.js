let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-route-active.common.js";
    break;
  case "umd":
    mappedModule = "<rootDir>/dist/curi-route-active.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
}

module.exports = {
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.spec.ts"],
  transform: {
    "\\.ts$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  globals: {
    "ts-jest": {
      module: "es6"
    }
  },
  testURL: "http://localhost",
  moduleNameMapper: {
    "@curi/route-active": mappedModule
  }
};
