var $fs = require('fs');
var $path = require('path');

var $webpack = require('webpack');
// var $webpackMultiEntryResolve = require('../index');

var root = $path.resolve(__dirname);

var webpackConfig = {
	entry: {
		'fd/entry3' : $path.resolve(root, 'entry/fd/entry3.js')
	},
	output: {
		path: $path.join(root, 'dist'),
		publicPath: '',
		filename: 'js/[name].js',
		chunkFilename: 'js/chunk/[id].chunk.js'
	},
	devtool: 'eval-source-map',
	module: {
		loaders: []
	},
	plugins: []
};

console.log(webpackConfig);

//----- entry and output ------
// $webpackMultiEntryResolve(webpackConfig, {
// 	rootPath : root,
// 	entryPath : $path.join(root, 'entry')
// });

module.exports = webpackConfig;