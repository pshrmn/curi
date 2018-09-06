const webpack = require("webpack");
const path = require("path");
const MiniCSS = require("mini-css-extract-plugin");

const SITE_ROOT = path.join(__dirname, "gh-pages");
const STATIC_ROOT = path.join(SITE_ROOT, "static");
const SITE_URL = "https://curi.js.org/";

const config = {
  context: path.join(__dirname, "src", "client"),
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
    })
  ]
};

module.exports = config;
