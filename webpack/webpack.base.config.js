const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
  mode: "development", // "production" | "development" | "none"
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        // include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "tsx",
              target: "es2015",
            },
          },
        ],
      },
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          esModule: false,
          inline: false,
        },
      },
      {
        test: /\.txt$/i,
        use: [
          {
            loader: "raw-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.css|less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              esModule: true,
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },

      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "img/[name].[hash:6][ext]",
          publicPath: "./",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css"],
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
      "@config": path.resolve(__dirname, "..", "config"),
    },
  },
  devtool: "eval-cheap-module-source-map",
  context: path.join(__dirname, "../"),
  target: ["web"],
  stats: "normal",
  devServer: {
    static: path.join(__dirname, "../"), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
  },
  plugins: [
    // new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  // list of additional plugins
  optimization: {
    minimize: false,
    concatenateModules: false,
    providedExports: false,
    usedExports: false,
    nodeEnv: false,
  },
};
