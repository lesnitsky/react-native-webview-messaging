const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: './web/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 9.3']
              }
            }]
          ]
        }
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.tpl.html',
      inlineSource: '.js$',
      cache: false,
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
}
