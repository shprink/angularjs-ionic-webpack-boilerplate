var webpack = require('webpack')
        , path = require('path')
        , HtmlWebpackPlugin = require('html-webpack-plugin');

// Optimizing common code when different entry points. For now it is useless as we have only on entry point: './src/js/main.js'
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        main: './src/js/main.js',
        style: './src/scss/bootstrap.scss'
    },
    output: {
        path: path.join(__dirname, 'www'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[chunkhash].js'
    },
    module: {
        // loaders list http://webpack.github.io/docs/list-of-loaders.html
        loaders: [
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10000&name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass?outputStyle=expanded"
            },
            {
                test: [/\.svg/, /\.eot/, /\.ttf/, /\.woff/],
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /[\/]angular\.js$/,
                loader: 'exports?angular' // For non commonJs
            },
            {
                test: /[\/]ionic\.js$/,
                loader: 'exports?ionic' // For non commonJs
            }
        ],
        noParse: [
            /bower_components/
        ]
    },
    resolve: {
//        extensions: ['', '.js', '.json', '.scss'],
        root: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'bower_components')
        ],
        moduleDirectories: [
            'bower_components',
            'node_modules'
        ],
        alias: {// If the the key ends with $ only the exact match (without the $) will be replaced.
            "ionic$": 'ionic/js/ionic.js',
            "ionic-angular": 'ionic/js/ionic-angular.js'
        }
    },
    plugins: [
        new webpack.ResolverPlugin(
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
                        'bower.json', ['main'])
                ),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: require('./package.json'),
            title: 'sphrink/angularjs-ionic-webpack-boilerplate',
            template: './src/index.html'
        })
    ]
};