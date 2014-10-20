var gulp = require('gulp')
        // gulp plugins
        , minifyHtml = require("gulp-minify-html")
        , taskListing = require('gulp-task-listing')
        , argv = require('minimist')(process.argv.slice(2))
        , gulpif = require('gulp-if')
        , refresh = require('gulp-livereload')
        , gutil = require("gulp-util")
        // Webserver
        , livereload = require('connect-livereload')
        , livereloadport = 35729
        , express = require('express')
        , serverport = 5000
        // Webpack
        , webpack = require('webpack')
        , webpackGulp = require('gulp-webpack')
        , webpackConfigPath = './webpack.config.js'
        , webpackConfig = require(webpackConfigPath)
        , webpackDevCompiler = webpack(webpackConfig)
        // Variables
        , destination = './www'
        , isProd = (typeof argv.prod === 'undefined') ? false : true;

gulp.task('default', function() {
    return gulp.src('src/entry.js')
            .pipe(gulpWebpack({}, webpack))
            .pipe(gulp.dest('dist/'));
});

gulp.task('views', function() {
    gulp.src(['src/index.html'])
            .pipe(gulpif(isProd, minifyHtml({
                quotes: true,
                empty: true
            })))
            .pipe(gulp.dest(destination));
});

gulp.task("webpack", function() {
    if (isProd) {
        gulp.start('webpack:build-prod');
    } else {
        gulp.start('webpack:build-dev');
    }
});
gulp.task("webpack:build-dev", function(callback) {
    webpackDevCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('watch', function() {
    var server = express();

    server.use(livereload({
        port: livereloadport
    }));
    server.use(express.static(destination));
    server.listen(8080, "localhost");

    refresh.listen(livereloadport);

//    gulp.watch(['./src/views/**/*.html', './src/index.html'], [
//        'views'
//    ]);

    gulp.watch(['./src/js/**/*', webpackConfigPath, './src/index.html'], [
        'webpack'
    ]);

    gulp.watch('./www/**').on('change', refresh.changed);
});