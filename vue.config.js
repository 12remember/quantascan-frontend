'use strict';

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new ScriptExtHtmlWebpackPlugin({
        custom: {
          test: /\.js$/, // adjust this regex based on your demand
          attribute: 'nonce',
          value: '<%= nonce %>'
        }
      }),
    ]
  }
}