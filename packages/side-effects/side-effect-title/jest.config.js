const mappedModule =
  process.env.TEST_ENV === "src"
    ? "<rootDir>/src/index"
    : "<rootDir>/dist/curi-side-effect-title.common.js";

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
<<<<<<< 223ca47faf03330a5eb3d555662ce014e93270ac
  testURL: "http://localhost"
=======
  moduleNameMapper: {
    "@curi/side-effect-title": mappedModule
  }
>>>>>>> @curi/side-effect-title test source and dist
};
