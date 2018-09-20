const webpack = require("webpack");
const path = require("path");

const SITE_ROOT = path.join(__dirname, "gh-pages");
const STATIC_ROOT = path.join(SITE_ROOT, "static");

const config = {
  context: path.join(__dirname, "src"),
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
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  plugins: []
};

module.exports = config;
