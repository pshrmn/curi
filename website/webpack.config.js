const webpack = require("webpack");
const path = require("path");
const MiniCSS = require("mini-css-extract-plugin");
const SWPrecache = require("sw-precache-webpack-plugin");

const SITE_ROOT = path.join(__dirname, "gh-pages");
const STATIC_ROOT = path.join(SITE_ROOT, "static");
const SITE_URL = "https://curi.js.org/";

const config = {
  context: path.join(__dirname, "src", "client"),
  entry: {
    index: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./index.js"
    ]
  },
  output: {
    path: STATIC_ROOT,
    filename: "js/bundle.js",
    chunkFilename: "js/[name]-[hash].bundle.js",
    publicPath: "/static/"
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [MiniCSS.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCSS({
      filename: "css/[name].css"
    }),
    new SWPrecache({
      cacheId: "curi-documentation-website",
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filepath: path.join(SITE_ROOT, "service-worker.js"),
      minify: false,
      navigateFallback: SITE_URL + "index.html",
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      staticFileGlobs: [path.join(STATIC_ROOT, "img", "*.png")],
      mergeStaticsConfig: true
    }),
    process.env.NODE_ENV !== "production"
      ? new webpack.HotModuleReplacementPlugin()
      : undefined
  ]
};

module.exports = config;
