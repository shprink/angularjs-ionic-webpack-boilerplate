var webpack = require('webpack');

// Optimizing common code when different entry points. For now it is useless as we have only on entry point: './src/js/main.js'
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'www/js/bundle.js'
    },
    module: {
        loaders: [
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        alias: {
            'ionic': 'ionic/release/js/ionic',
            'angular': 'ionic/release/js/angular/angular',
            'ionic-angular': 'ionic/release/js/ionic-angular',
            'angular-animate': 'ionic/release/js/angular/angular-animate',
            'angular-sanitize': 'ionic/release/js/angular/angular-sanitize',
            'angular-ui-router': 'ionic/release/js/angular-ui/angular-ui-router'
        }
    },
//    plugins: [commonsPlugin]
};