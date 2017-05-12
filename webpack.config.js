const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
module.exports = {
    entry: {
        'polyfills': './polyfills.ts',
        'login': './login.ts',
        'student': './student.ts',
        'teacher': './teacher.ts',
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devServer: {
        port: 1337
    },
    devtool: 'inline-source-map',

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
            template: './login.html',
            filename: 'login.html',
            chunks: ['login', 'polyfills'],
            chunksSortMode: 'auto'
        }),
        new HtmlWebpackPlugin({
            template: './student.html',
            filename: 'student.html',
            chunks: ['student', 'polyfills'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: './teacher.html',
            filename: 'teacher.html',
            chunks: ['teacher', 'polyfills'],
            chunksSortMode: 'none'
        }),
        new ExtractTextPlugin("[name].css"),
        //new webpack.optimize.DedupePlugin(),
        /*new webpack.optimize.UglifyJsPlugin({
         sourceMap: false,
         comments: false,
         }),*/
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
        }),
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