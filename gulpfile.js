var gulp = require('gulp')
        // gulp plugins
        , minifyHtml = require("gulp-minify-html")
        , taskListing = require('gulp-task-listing')
        , argv = require('minimist')(process.argv.slice(2))
        , gulpif = require('gulp-if')
        , refresh = require('gulp-livereload')
        , gutil = require("gulp-util")
        , del = require('del')
        , path = require('path')
        // Webpack
        , webpack = require('webpack')
        , open = require('open')
        , webpackGulp = require('gulp-webpack')
        , webpackConfigPath = './webpack.config.js'
        , webpackConfig = require(webpackConfigPath)
        , webpackDevCompiler = webpack(webpackConfig)
        , webpackDevServer = require('webpack-dev-server')
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

gulp.task('webpack-dev-server', function(callback) {
    new webpackDevServer(webpackDevCompiler, {
//        contentBase: path.join(__dirname, 'www'),
//        publicPath : '/',
        stats: {
            colors: true
        }

    }).listen(8082, 'localhost', function(err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        var startUrl = 'http://localhost:8082/webpack-dev-server/index.html';
        open(startUrl);
        gutil.log('[webpack-dev-server]', startUrl);
    });
});

gulp.task('clean:all', function (cb) {
  del(destination + '/*', cb);
});

gulp.task('watch', ['webpack-dev-server']);