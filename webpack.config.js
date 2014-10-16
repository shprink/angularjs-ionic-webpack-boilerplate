var webpack = require('webpack');

// Optimizing common code when different entry points. For now it is useless as we have only on entry point: './src/js/main.js'
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

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
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json']
    },
    plugins: [commonsPlugin]
};