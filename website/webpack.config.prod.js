const webpack = require("webpack");
const path = require("path");
const SWPrecache = require("sw-precache-webpack-plugin");
const configBase = require("./webpack.config.base.js");

const SITE_ROOT = path.join(__dirname, "gh-pages");
const STATIC_ROOT = path.join(SITE_ROOT, "static");
const SITE_URL = "https://curi.js.org/";

const config = {
  ...configBase,
  mode: "production",
  entry: {
    index: ["./index.js"]
  },
  plugins: [
    ...configBase.plugins,
    new SWPrecache({
      cacheId: "curi-documentation-website",
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filepath: path.join(SITE_ROOT, "service-worker.js"),
      minify: false,
      navigateFallback: SITE_URL + "index.html",
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      staticFileGlobs: [path.join(STATIC_ROOT, "img", "*.png")],
      mergeStaticsConfig: true
    })
  ]
};

module.exports = config;
