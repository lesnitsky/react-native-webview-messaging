const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'dev';
const library = 'react-native-webview-messaging';


const outPath = path.join(
  __dirname,
 ...(isDev ? ['examples', 'node_modules', library] : ['dist']),
);

console.log(outPath);

module.exports = {
  entry: {
    web: './src/web/index.js',
  },
  output: {
    path: outPath,
    filename: './web/index.js',
    library,
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    ...[!isDev ? new webpack.optimize.UglifyJsPlugin() : null],
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
  ].filter(Boolean),
};
