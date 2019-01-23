const webpack = require("webpack");
const path = require("path");

const configBase = require("./webpack.config.base.js");

const PUBLIC_ROOT = path.join(__dirname, "public");

const config = {
  ...configBase,
  mode: "development",
  entry: "./index.js",
  output: {
    path: PUBLIC_ROOT,
    filename: "js/bundle.js",
    chunkFilename: "js/[name]-[hash].bundle.js",
    publicPath: "/static/"
  },
  plugins: [...configBase.plugins, new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: PUBLIC_ROOT,
    historyApiFallback: true,
    publicPath: "http://localhost:8080/static/",
    compress: true,
    hot: true
  }
};

module.exports = config;
