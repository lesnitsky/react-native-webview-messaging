const path = require('path');
const webpack = require('webpack');
const WrapperPlugin = require('wrapper-webpack-plugin');

module.exports = {
  entry: {
    injected: './src/injected.js',
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
    new WrapperPlugin({
      header: 'module.exports = `',
      footer: '`;'
    })
  ]
};
