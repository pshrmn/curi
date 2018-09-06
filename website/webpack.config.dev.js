const webpack = require("webpack");
const configBase = require("./webpack.config.base.js");

const config = {
  ...configBase,
  mode: "development",
  entry: {
    index: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./index.js"
    ]
  },
  plugins: [...configBase.plugins, new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
