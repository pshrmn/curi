let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-react.common.js";
    break;
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-react.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
}

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
