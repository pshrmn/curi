const express = require("express");
const path = require("path");
const webpack = require("webpack");

const createRenderer = require("./renderer").default;

const __DEV__ = process.env.NODE_ENV !== "production";

const webpackConfig = require(__DEV__
  ? "../../webpack.config.dev.js"
  : "../../webpack.config.prod.js");

const compiler = webpack(webpackConfig);

module.exports = function createApp(debug) {
  const app = express();

  if (__DEV__) {
    app.use(
      require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
      })
    );

    app.use(require("webpack-hot-middleware")(compiler));
  }

  debug = debug != undefined ? debug : false;

  const STATIC_DIR = path.join(__dirname, "..", "..", "gh-pages", "static");
  app.use("/static", express.static(STATIC_DIR));

  const renderer = createRenderer(debug);
  app.get("*", renderer);
  return app;
};
