var $fs = require('fs');
var $path = require('path');

var $webpack = require('webpack');
var $webpackMultiEntryResolve = require('../index');

var root = $path.resolve(__dirname);

var webpackConfig = {
	entry: {},
	output: {
		path: $path.join(root, 'dist'),
		publicPath: '',
		filename: 'js/[name].js',
		chunkFilename: 'js/chunk/[id].chunk.js'
	},
	module: {
		loaders: []
	},
	plugins: []
};

$webpackMultiEntryResolve(webpackConfig, {
	rootPath : root,
	entryPath : $path.join(root, 'entry')
});

module.exports = webpackConfig;
