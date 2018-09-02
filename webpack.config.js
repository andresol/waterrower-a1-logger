const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({})
    ],
    entry: './public/js/src/main.js',
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'bundle.js'
    }
};