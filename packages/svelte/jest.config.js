const mappedModule =
  process.env.TEST_ENV === "src"
    ? "<rootDir>/src/index"
    : "<rootDir>/dist/curi-svelte.common.js";

module.exports = {
  moduleFileExtensions: ["js", "html"],
  transform: {
    "\\.js$": "babel-jest",
    "\\.html$": "./scripts/svelteCompile"
  },
  transformIgnorePatterns: ["node_modules/(?!(svelte)/)"],
  testMatch: ["**/tests/**/*.spec.js"],
  testURL: "http://localhost",
  moduleNameMapper: {
    "@curi/svelte": mappedModule
  }
};
