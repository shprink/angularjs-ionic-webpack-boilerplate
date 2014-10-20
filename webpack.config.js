var webpack = require('webpack')
        , path = require('path')
        , HtmlWebpackPlugin = require('html-webpack-plugin');

// Optimizing common code when different entry points. For now it is useless as we have only on entry point: './src/js/main.js'
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: './www/js/bundle.js'
    },
    module: {
        loaders: [
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}, // inline base64 URLs for <=8k images, direct URLs for the rest
//            {
//                test: /[\/]ionic\.js$/,
//                loader: 'exports?ionic'
//            }
        ],
        noParse: [
            /bower_components/
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        root: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'bower_components'),
            path.join(__dirname, 'node_modules')
        ],
        moduleDirectories: [
            'bower_components',
            'node_modules'
        ],
        alias: { // If the the key ends with $ only the exact match (without the $) will be replaced.
            "ionic$": 'ionic/js/ionic.js',
            "ionic-angular": 'ionic/js/ionic-angular.js'
//            'angular': 'angular/angular.js',
//            'angular-animate': 'angular-animate/angular-animate',
//            'angular-sanitize': 'angular-sanitize/angular-sanitize',
//            'angular-ui-router': 'angular-ui-router/release/angular-ui-router'
        }
    },
    plugins: [
        new webpack.ResolverPlugin(
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
                        'bower.json', ['main'])
                ),
        new HtmlWebpackPlugin({
            filename: './www/index.html',
            title: 'sphrink/angularjs-ionic-webpack-boilerplate',
            template: './src/index.html'
        })
    ]
};