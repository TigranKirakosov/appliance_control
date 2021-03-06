const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['@babel/polyfill', 'react-app-polyfill/ie11', './src/index.tsx'],
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css/,
            resolve: {
            extensions: ['.css']
            },
            use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader'
            ]
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)$/i,
            loader: 'file-loader',
            options: {
            name: '[name].[ext]'
            }
        }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css',
            path: path.resolve(__dirname, '/dist')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        compress: true,
        progress: true,
        port: 3000,
        open: true,
        historyApiFallback: true,
        stats: 'minimal',
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:4400',
                ws: true
            },
            {
                context: ['/api'],
                target: 'ws://localhost:4400',
                changeOrigin: true,
                ws: true
            }
        ]
    }
};
