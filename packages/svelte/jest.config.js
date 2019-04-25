let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-svelte.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
}

module.exports = {
  moduleFileExtensions: ["js", "html"],
  transform: {
    "\\.js$": "babel-jest",
    "\\.svelte$": "./scripts/svelteCompile"
  },
  transformIgnorePatterns: ["node_modules/(?!(svelte)/)"],
  testMatch: ["**/tests/**/*.spec.js"],
  testURL: "http://localhost",
  moduleNameMapper: {
    "@curi/svelte": mappedModule
  }
};
