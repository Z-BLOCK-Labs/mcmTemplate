const { argv } = require("./utils");
const { merge } = require("webpack-merge");
const path = require("path");
const devConfig = require("./webpack.base.config");
const prodConfig = require("./webpack.prod.base.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { mode, env } = argv;
const page = env.split("=")[1];
let baseConfig = mode === "production" ? prodConfig : devConfig;

let HtmlPluginConfig;
let entryPath = "";
if (page === "h5") {
  entryPath = "../src/pages/H5/src/index.tsx";
  HtmlPluginConfig = {
    template: path.resolve("./public/template/index-h5.html"),
    favicon: path.resolve("./public/favicon.ico"),
  };
} else {
  entryPath = "../src/pages/PC/src/index.tsx";
  HtmlPluginConfig = {
    template: path.resolve("./public/template/index.html"),
    favicon: path.resolve("./public/favicon.ico"),
  };
}

baseConfig.plugins.push(new HtmlWebpackPlugin(HtmlPluginConfig));

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, entryPath),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].js",
  },
});
