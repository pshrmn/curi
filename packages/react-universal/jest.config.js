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
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/tests/**/*.spec.tsx"],
  transform: {
    "\\.tsx?$": "ts-jest"
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
    "@curi/react-universal": mappedModule
  }
};
