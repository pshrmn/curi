module.exports = {
  moduleFileExtensions: ["js", "html"],
  transform: {
    "\\.js$": "./scripts/babelCompile",
    "\\.html$": "./scripts/svelteCompile"
  },
  transformIgnorePatterns: ["node_modules/(?!(svelte)/)"],
  testMatch: ["**/tests/**/*.spec.js"]
};
