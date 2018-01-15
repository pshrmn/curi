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
  setupFiles: ["<rootDir>/tests/setup/enzyme.js"],
  mapCoverage: true,
  collectCoverageFrom: ["src/*.tsx"]
};
