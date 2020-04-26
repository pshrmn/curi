const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let configBase = require("./webpack.config.base.js");

let config = {
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
  },
  module: {
    ...configBase.module,
    rules: [
      ...configBase.module.rules,
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  },
  plugins: [...configBase.plugins, new MiniCssExtractPlugin()]
};

module.exports = config;
