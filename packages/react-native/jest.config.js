let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/packages/react-native/dist/curi-react-native.js";
    break;
  default:
    mappedModule = "<rootDir>/packages/react-native/src/index";
}

module.exports = {
  preset: "react-native",
  rootDir: "../..",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["<rootDir>/packages/react-native/tests/**/*.spec.tsx"],
  transform: {
    "\\.tsx?$": "ts-jest",
    "\\.jsx?$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
  },
  transformIgnorePatterns: ["node_modules/(?!react-native)/"],
  globals: {
    "ts-jest": {
      module: "es6",
      diagnostics: false,
      tsConfig: "./tsconfig.json"
    }
  },
  moduleNameMapper: {
    "^React$": "<rootDir>/node_modules/react",
    "@curi/react-native": mappedModule
  },
  collectCoverageFrom: ["src/**/*"]
};
