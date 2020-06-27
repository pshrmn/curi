let path = require("path");

let config = {
  mode: "development",
  output: {
    filename: "js/bundle.js",
    publicPath: "/static/"
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: require("../babel/svelte.js")
          }
        ]
      },
      {
        test: /\.svelte$/,
        use: [
          {
            loader: "svelte-loader"
          }
        ]
      }
    ]
  }
};

module.exports = config;
