const mappedModule =
  process.env.TEST_ENV === "src"
    ? "<rootDir>/src/index"
    : "<rootDir>/dist/curi-side-effect-scroll.common.js";

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
    "@curi/side-effect-scroll": mappedModule
  }
};
