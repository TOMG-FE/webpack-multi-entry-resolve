var $del = require('del');
var $gulp = require('gulp');
var $gulpMocha = require('gulp-mocha');
var $runSequence = require('run-sequence');
var $gulpWebpack = require('gulp-webpack');

var $webpackConfig = require('./test/webpack.config');

$gulp.task('clean', function() {
	return $del(['./test/dist']);
});

$gulp.task('webpack', function() {
	return $gulp.src([
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

$gulp.task('mocha', function() {
	$gulp.src('test/test.js').pipe(
		$gulpMocha()
	);
});

$gulp.task('test', function() {
	return $runSequence(
		'clean',
		'webpack',
		'mocha'
	);
});

$gulp.task('default', ['test']);

