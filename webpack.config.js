const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    lib: './src/lib.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
};
