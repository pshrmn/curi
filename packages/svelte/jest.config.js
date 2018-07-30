module.exports = {
  moduleFileExtensions: ["js", "html"],
  transform: {
    "\\.js$": "babel-jest",
    "\\.html$": "./scripts/svelteCompile"
  },
  transformIgnorePatterns: ["node_modules/(?!(svelte)/)"],
  testMatch: ["**/tests/**/*.spec.js"],
  testURL: "http://localhost"
};
