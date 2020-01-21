let { VueLoaderPlugin } = require("vue-loader");

let config = {
  mode: "development",
  output: {
    filename: "js/bundle.js",
    publicPath: "/static/"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.common.js"
    }
  },
  externals: {
    vue: "Vue"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: require("../babel/vue.js")
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};

module.exports = config;
