const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/static/js/',
    path: path.resolve(__dirname, 'public', 'js')
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
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
      }
    ]
  }
};

module.exports = config;
