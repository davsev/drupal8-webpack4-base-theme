const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './assets/src/js/main.js',
  plugins: [
    // Adding our UglifyJS plugin
    new UglifyJSPlugin(),
    new MiniCssExtractPlugin({
        filename: "./css/[name].css",
        chunkFilename: "./css/[id].css"
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets/dist/')
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
            loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                }
            }
        },
        //sass
        {
            test: /\.(scss|css)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        minimize: {
                            safe: true
                        }
                    }
                },
                {
                    loader: "sass-loader",
                    options: {}
                }
            ]
        }
    ]
  }
};