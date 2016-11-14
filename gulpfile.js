var $fs = require('fs');
var $path = require('path');

var $del = require('del');
var $gulp = require('gulp');
var $runSequence = require('run-sequence');
var $gulpWebpack = require('gulp-webpack');
var $webpackMultiEntryResolve = require('./index');

var $webpackConfig = require('./test/webpack.config');

$gulp.task('clean', function () {
    return $del(['./test/dist']);
});

$gulp.task('webpack', function () {

    $gulp.src([
        'entry/*.js'
    ], {
        cwd: './test',
        base: './test'
    }).pipe(
        $gulpWebpack($webpackConfig)
    ).pipe(
        $gulp.dest('./test/dist')
    );

});

$gulp.task('test', function(){
    return $runSequence(
        'clean',
        'webpack'
    );
});

$gulp.task('default', ['test']);

