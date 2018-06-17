const mappedModule =
  process.env.TEST_ENV === "src"
    ? "<rootDir>/src/index"
    : "<rootDir>/dist/curi-react.common.js";

module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/tests/**/*.spec.tsx"],
  transform: {
    "\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  globals: {
    "ts-jest": {
      module: "es6"
    }
  },
  setupFiles: ["<rootDir>/tests/setup/rAF.js"],
  collectCoverageFrom: ["src/*.tsx"],
  testURL: "http://localhost",
  moduleNameMapper: {
    "@curi/react": mappedModule
  }
};
