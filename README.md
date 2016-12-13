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

#### options.entryGlobs

Type: `String` | `Array`

项目打包入口文件选择器，参见 walk-sync 的 globs 选项

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

#### options.html

Type: `Object`

html模板文件路径，用于配置htmlWebpackPlugin

入口文件和html模板文件应该一一对应

```js
$webpackMultiEntryResolve(webpackConfig, {
	rootPath : root,
	entryPath : $path.join(root, 'entry'),
	html : {
		templatePath : $path.join(root, 'pages')
	}
});
```

## Release History

 * 2016-12-13 v0.1.5 修正 windows 环境下未能正确识别html路径的问题
 * 2016-11-16 v0.1.4 引入 html.templateGlobs 选项，可配置 html 文件类型，添加项目单元测试
 * 2016-11-07 v0.1.3 引入 entryGlobs 选项，方便过滤入口文件
 * 2016-11-03 v0.1.2 支持 pug 等模板引擎
 * 2016-11-02 v0.1.1 实现与 htmlWebpackPlugin 的匹配
 * 2016-10-08 v0.1.0 发布第一个正式版



