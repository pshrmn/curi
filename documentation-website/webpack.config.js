const webpack = require('webpack');
const path = require('path');

const config = {
  context: path.join(__dirname, 'src', 'client'),
  entry: {
    index: './index.js',
    vendor: [
      'curi',
      'curi-react',
      'hickory',
      'react-prism'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'docs', 'static'),
    filename: 'js/bundle.js'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
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
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js',
      minChunks: Infinity
    })
  ]
};

module.exports = config;
