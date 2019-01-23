const configBase = require("./webpack.config.base.js");

const config = {
  ...configBase,
  mode: "production",
  entry: {
    index: ["./index.js"]
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        async: {
          chunks: "async",
          minSize: 0,
          minChunks: 2
        }
      }
    }
  }
};

module.exports = config;
