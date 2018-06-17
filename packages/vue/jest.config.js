const mappedModule =
  process.env.TEST_ENV === "src"
    ? "<rootDir>/src/index"
    : "<rootDir>/dist/curi-vue.common.js";

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
  moduleNameMapper: {
    "^vue$": "<rootDir>/node_modules/vue/dist/vue.common.js",
    "@curi/vue": mappedModule
  },
  testURL: "http://localhost"
};
