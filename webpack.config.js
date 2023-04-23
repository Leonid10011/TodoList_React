const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.tsx"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          }

        ]
      }
    ]
  },
  plugins: [new ESLintWebpackPlugin],
  resolve: {
    extensions: [
      ".js",
      ".ts",
      ".tsx",
      ".css",
    ]
  },
 output: {
  path: path.resolve(__dirname, "./public"),
  filename: "bundle.js",
 },
 devServer: {
  static: path.resolve(__dirname, "./dist"),
 },
 devtool: false,
}