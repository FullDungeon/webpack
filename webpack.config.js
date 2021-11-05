// & https://tproger.ru/translations/webpack-basics/

const path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

// пути
DEV_ROOT = "./src"
DIST_ROOT = "./dist"

STYLE_PATH = "scss"
JS_PATH = "js"

module.exports = {

    // настройки окружения
    entry: path.resolve(DEV_ROOT, "index.js"),
    output: {
        path: path.resolve(__dirname, DIST_ROOT),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: false
    },

    // плагины
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style/style.css",
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/'
        },
        {
            reload: false
        }
        ),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            inject: 'body',
            minify: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },

    // devServer
    devServer: {
        static: {
            directory: './src/',
        },
        compress: true
    }
};