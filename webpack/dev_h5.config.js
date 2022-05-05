const { merge } = require('webpack-merge');
const normalConfig = require('./webpack.base.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

normalConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve("./public/template/index-h5.html"),
    favicon: path.resolve("./public/favicon.ico"),
  })
);

const config = merge(normalConfig, {
    entry: path.resolve(__dirname, '../src/pages/H5/src/index.tsx'), // string | object | array
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].js',
    },
});


module.exports = config;
