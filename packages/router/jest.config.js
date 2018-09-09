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
    "@curi/router": mappedModule
  }
};
