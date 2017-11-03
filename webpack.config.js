const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const isDev = process.env.NODE_ENV !== "production";

const config = {
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, '/static/'),
    filename: "app.js"
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("app.css"),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body",
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      )
    })
  ]
};

if (isDev) {
  config.devtool = "eval-source-map";
  config.entry.push("webpack-hot-middleware/client?reload=true");
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.devtool = "source-map";
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    })
  );
}

module.exports = config;
