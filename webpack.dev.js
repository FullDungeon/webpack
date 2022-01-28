const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    optimization: {
        minimize: false
    },
    plugins: [
        new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/'
            },
        {
                reload: false
            }
        ),
    ],
    devServer: {
        static: {
            directory: './src/',
        },
        compress: true
    },
})