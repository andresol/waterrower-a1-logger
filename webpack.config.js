const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new LiveReloadPlugin({})
    ],
    entry: './public/js/src/main.js',
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'bundle.js'
    }
};