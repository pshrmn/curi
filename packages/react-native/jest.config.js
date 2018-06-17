const mappedModule =
  process.env.TEST_ENV === "src"
    ? "<rootDir>/src/index"
    : "<rootDir>/dist/curi-react-native.common.js";

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
