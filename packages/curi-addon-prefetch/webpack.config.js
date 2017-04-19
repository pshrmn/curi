const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  output: {
    library: 'CuriAddonPrefetch',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
