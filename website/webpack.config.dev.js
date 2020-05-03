let webpack = require("webpack");
let path = require("path");

let configBase = require("./webpack.config.base.js");

let PUBLIC_ROOT = path.join(__dirname, "public");

let config = {
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
  },
  module: {
    ...configBase.module,
    rules: [
      ...configBase.module.rules,
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      }
    ]
  }
};

module.exports = config;
