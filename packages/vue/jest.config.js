let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-vue.js";
    break;
  case "umd":
    mappedModule = "<rootDir>/dist/curi-vue.umd.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
}

module.exports = {
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.spec.ts"],
  transform: {
    "\\.ts$": "ts-jest"
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
