var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');


// Webpack Config
module.exports = {
  entry: {
    'polyfills':       './src/polyfills.ts',
    'vendor':          './src/vendor.ts',
    'app':             './src/main.ts'
  },

  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  devServer: {
    port: 1337
  },
  devtool: 'source-map',

  output: {
    path: './dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.DedupePlugin()
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      }
    ]
  },
  target: 'electron-renderer'

};