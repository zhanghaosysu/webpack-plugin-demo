const path = require('path');
const DemoPlugin = require("./plugins/my-demo-plugin");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin");


module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  devtool: false,
  plugins: [new DemoPlugin(), new CleanWebpackPlugin("我是参数")],
};
