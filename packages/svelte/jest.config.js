let mappedModule, mappedComponent;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/curi-svelte.js";
    mappedComponent = "<rootDir>/components/$1";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
    mappedComponent = "<rootDir>/src/$1";
}

module.exports = {
  moduleFileExtensions: ["js"],
  transform: {
    "\\.js$": "babel-jest",
    "\\.svelte$": "./scripts/svelteCompile"
  },
  transformIgnorePatterns: ["node_modules/(?!(svelte)/)"],
  testMatch: ["**/tests/**/*.spec.js"],
  testURL: "http://localhost",
  moduleNameMapper: {
    "@curi/svelte/components/(.+)": mappedComponent,
    "@curi/svelte": mappedModule
  }
};
