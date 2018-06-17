let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-react-native.common.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
}

module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/tests/**/*.spec.tsx"],
  transform: {
    "\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
    "\\.jsx?$": "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!react-native)/"],
  globals: {
    "ts-jest": {
      module: "es6"
    }
  },
  moduleNameMapper: {
    "^React$": "<rootDir>/../../node_modules/react",
    "@curi/react-native": mappedModule
  },
  collectCoverageFrom: ["src/*.tsx"]
};
