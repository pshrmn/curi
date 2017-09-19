const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'js')
  },
  resolve: {
    extensions: ['.js', '.html']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'svelte-loader'
          }
        ]
      }
    ]
  }
};

module.exports = config;
