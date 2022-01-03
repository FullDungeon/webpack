const path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

// пути
DEV_ROOT = "./src"
DIST_ROOT = "./dist"

module.exports = {

    // настройки окружения
    entry: path.resolve(DEV_ROOT, "index.js"),
    output: {
        path: path.resolve(__dirname, DIST_ROOT),
        filename: 'bundle.js',
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
        }),
        /* ---- для многостраничного сайта
           Здесь можно указать различные файлы HTML, добавляя новые вызовы HtmlWebpackPlugin
           с соответствующим названием файла и пути к нему.

           Для всех страниц генерируется один файл JavaScript и один файл со стилями CSS.
        */
        new HtmlWebpackPlugin({
            filename: 'second.html',
            template: __dirname + "/src/pages/second.html",
            inject: 'body',
            minify: false
        }),
        // ----;
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.ttf$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }
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