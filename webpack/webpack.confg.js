const { merge } = require("webpack-merge");
const path = require("path");
const devConfig = require("./webpack.base.config");
const prodConfig = require("./webpack.prod.base.config");
const { DefinePlugin } = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = ({ platform, analyzer }, { mode }) => {
  let baseConfig = mode === "production" ? prodConfig : devConfig;
  let HtmlPluginConfig;
  let entryPath = "";
  if (platform === "h5") {
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
  if (analyzer) {
    baseConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  smp.wrap(baseConfig);
  baseConfig.plugins.push(new MiniCssExtractPlugin());

  baseConfig.plugins.push(
    new DefinePlugin({
      "process.env.platform": JSON.stringify(platform),
      "process.env.NODE_ENV": JSON.stringify(mode),
    })
  );
  // );
  return merge(baseConfig, {
    entry: path.resolve(__dirname, entryPath),
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "[name].[contenthash].js",
    },
  });
};
