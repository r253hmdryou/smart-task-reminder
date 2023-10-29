const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;

module.exports = {
  mode: "development",
  entry: "./src/Index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/",
  },

  devtool: "source-map",

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
      "@smart-task-reminder/common": path.resolve(__dirname, "../common/dist"),
      "@smart-task-reminder/api-client": path.resolve(__dirname, "../api-client/dist"),
    },
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: false,
    port: 4000,
    client: {
      logging: "info",
    },
    compress: false,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
  ],
};
