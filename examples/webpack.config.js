const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const examples = fs.readdirSync('./src')
  .filter(entry => entry.indexOf('Example') !== -1);

const entry = examples
  .reduce(
    (acc, example) => (acc[example] = ['babel-polyfill', `./src/${example}/web.js`], acc),
    {},
  );

const plugins = examples.reduce(
  (plugins, example) => [
    ...plugins,
    new HtmlWebpackPlugin({
      chunks: [example],
      title: example,
      filename: `${example}.html`,
      template: './index.tpl.html',
      inlineSource: '.js',
      cache: false,
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  [],
);


module.exports = {
  entry,
  plugins,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 9.3']
              },
            }]
          ],
          plugins: [
            'transform-async-to-generator',
            'transform-class-properties',
          ],
        },
      }
    }]
  },
}
