const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: './web/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
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
