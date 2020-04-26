let path = require("path");

let SITE_ROOT = path.join(__dirname, "gh-pages");
let STATIC_ROOT = path.join(SITE_ROOT, "static");

let config = {
  context: path.join(__dirname, "src"),
  output: {
    path: STATIC_ROOT,
    filename: "js/bundle.js",
    chunkFilename: "js/[name].bundle.js",
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
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: []
};

module.exports = config;
