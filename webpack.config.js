const {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

module.exports = {
    entry: {
        "/SiteAssets/scripts/breweries":'./src/index.js'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
            /* use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'SiteAssets/css/',
                        name: '[name].[ext]'
                    }
                }
            ] */
          },
        //   {
        //     test: /\.(png|jpg|gif|svg)$/,
        //     use: [
        //       {
        //         loader: 'file-loader',
        //         options: {
        //             outputPath: '/SiteAssets/images/breweries/',
        //             name: '[name].[ext]'
        //         }
        //       }
        //     ]
        //   }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'breweries.txt',
            inject: 'body'
        }),
    ]
};