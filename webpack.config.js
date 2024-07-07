const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode:"development",
  plugins:[new htmlWebpackPlugin({
    title:"phaser3-start",
    template:"index.html"
  })]
};