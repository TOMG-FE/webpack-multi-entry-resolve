# webpack-multi-entry-resolve
webpack多入口文件处理

## Getting Started

```shell
npm install webpack-multi-entry-resolve --save-dev
```

__examples__

```js
//webpack.config.js

var $fs = require('fs');
var $path = require('path');

var $webpack = require('webpack');
var $webpackMultiEntryResolve = require('webpack-multi-entry-resolve');

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

```

## options

#### options.rootPath

Type: `String`

项目打包目录根路径

#### options.entryPath

Type: `String`

项目打包入口文件夹

#### options.filters

Type: `Array`

文件过滤器，为过滤函数数组，默认过滤器为

```js
[
	function(file){
		return $path.extname(file) === '.js';
	}
]
```

## Release History

 * 2016-10-08 v0.1.0 发布第一个正式版。



