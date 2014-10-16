var gulp = require('gulp')
        , minifyHtml = require("gulp-minify-html")
        , argv = require('minimist')(process.argv.slice(2))
        , webpack = require('webpack')
        , gulpif = require('gulp-if')
        , WebpackDevServer = require("webpack-dev-server")
        , refresh = require('gulp-livereload')
        , livereload = require('connect-livereload')
        , livereloadport = 35729
        , gulpWebpack = require('gulp-webpack');

var IS_RELEASE_BUILD = (typeof argv.prod === 'undefined') ? false : true;

gulp.task('default', function() {
    return gulp.src('src/entry.js')
            .pipe(gulpWebpack({}, webpack))
            .pipe(gulp.dest('dist/'));
});

gulp.task('views', function() {
    gulp.src(['src/index.html'])
            .pipe(gulpif(IS_RELEASE_BUILD, minifyHtml({
                quotes: true,
                empty: true
            })))
            .pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
    var compiler = webpack(require('./webpack.config.js'));

    var server = new WebpackDevServer(compiler, {
        contentBase: "www",
        hot: false,
        quiet: false,
        noInfo: false,
        lazy: true,
        watchDelay: 300,
//        publicPath: "./src/",
        headers: {"X-Custom-Header": "yes"},
        stats: {colors: true}
    });
    
    server.use(livereload({port: livereloadport}));

    gulp.watch(['./src/views/**/*.html', './src/index.html'], [
        'views'
    ]);

//    gulp.watch(['lib/js/*.js', 'lib/js/**/*.js'], [
//        //        'lint',
//        'browserify'
//    ]);

    server.listen(8080, "localhost");
});