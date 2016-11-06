var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
module.exports = {
  entry: {
    'polyfills':       './polyfills.ts',
    'vendor':          './vendor.ts',
    'app':             './main.ts'
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
    chunkFilename: '[id].chunk.js',
    publicPath: './'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.jpg', '.css', '.html']
  },
  context: path.join(__dirname, 'src'),

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.DedupePlugin(),
    new CopyWebpackPlugin([
      {
        context: 'assets',
        from: '**/*',
        to: path.join(__dirname, 'dist/assets')
      },
      {
        context: 'pdfjs/build',
        from: '**/*',
        to: path.join(__dirname, 'dist/build')
      },
      {
        context: 'pdfjs',
        from: '**/*',
        to: path.join(__dirname, 'dist/pdfjs')
      }
    ])
  ],

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/],
        include: [path.resolve(path.join(__dirname, "src"))]
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  target: 'electron-renderer'

};