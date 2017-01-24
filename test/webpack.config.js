var $path = require('path');
var $walkSync = require('walk-sync');
var $htmlWebpackPlugin = require('html-webpack-plugin');

var $webpackMultiEntryResolve = require('../index');

var root = $path.resolve(__dirname);

var webpackConfig = {
	entry: {},
	output: {
		path: $path.join(root, 'dist'),
		publicPath: '../../',
		filename: 'js/[name].js',
		chunkFilename: 'js/chunk/[id].chunk.js'
	},
	module: {
		loaders: []
	},
	plugins: []
};

webpackConfig.module.loaders.push({
	// 文件加载器，处理文件静态资源
	test: /\.pug$/,
	loader: 'pug',
	query: {
		pretty: true
	}
});

$webpackMultiEntryResolve(webpackConfig, {
	root: root,
	path: $path.join(root, 'entry'),
	globs: '**/*.js',
	global: ['global/global'],
	html: {
		path: $path.join(root, 'entry')
	},
	mock: {
		path: $path.join(root, 'mock')
	}
});

webpackConfig.plugins.push(
	new $htmlWebpackPlugin({
		filename: 'index.html',
		pages: $walkSync($path.join(root, 'entry'), {
			globs: ['**/*.{html,pug}']
		}),
		template: $path.join(root, 'index.pug'),
		inject: 'body',
		hash: false,
		chunks: [],
		chunksSortMode: 'none',
		minify: false
	})
);
module.exports = webpackConfig;
