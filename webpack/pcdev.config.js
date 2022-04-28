const { merge } = require('webpack-merge');
const normalConfig = require('./webpack.base.config.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

normalConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: '/public/template/index.html',
        favicon: path.resolve('./public/favicon.ico'),
    })
);

module.exports = merge(normalConfig, {
    entry: path.resolve(__dirname, '../src/pages/PC/src/index.tsx'), // string | object | array
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].js',
    },
});
