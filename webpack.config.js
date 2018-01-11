const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    web: './src/web/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: './web/index.js',
    library: 'react-native-webview-messaging',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{
      from: './src/react-native',
      to: './react-native',
    }, {
      from: './src/shared',
      to: './shared',
    }, {
      from: './package.json',
      to: '.',
    }])
  ]
};
