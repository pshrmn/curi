const webpack = require("webpack");
const MiniCSS = require("mini-css-extract-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require("path");

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
  module: {
    rules: [
      ...configBase.module.rules,
      {
        test: /\.scss$/,
        use: [MiniCSS.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    ...configBase.plugins,
    new MiniCSS({
      filename: "css/[name].css"
    })
    //new BundleAnalyzerPlugin()
  ],
  optimization: {
    //minimize: false
  }
};

module.exports = config;
