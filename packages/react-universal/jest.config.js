let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-react-universal.js";
    break;
  case "umd":
    mappedModule = "<rootDir>/dist/curi-react-universal.umd.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
}

module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/tests/**/*.spec.tsx"],
  globals: {
    "ts-jest": {
      module: "es6",
      diagnostics: false
    }
  },
  setupFiles: ["<rootDir>/tests/setup/rAF.js"],
  collectCoverageFrom: ["src/**/*"],
  testURL: "http://localhost",
  moduleNameMapper: {
    "@curi/react-universal": mappedModule
  }
};
