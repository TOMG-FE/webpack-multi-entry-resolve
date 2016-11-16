var $fs = require('fs');
var $path = require('path');
var $walkSync = require('walk-sync');
var $assign = require('lodash/assign');
var $htmlWebpackPlugin = require('html-webpack-plugin');

function makeArray(item){
	if(Array.isArray(item)){
		return item;
	}else if(item){
		return [item];
	}else{
		return;
	}
}

function multiEntryResolve(webpackConfig, options){

	var conf = $assign({
		entryPath : './',
		entryGlobs : null,
		rootPath : process.cwd(),
		html : null,
		filters : [
			function(file){
				return $path.extname(file) === '.js';
			}
		]
	}, options);

	var htmlConf = $assign({
		outputPath : 'html',
		templatePath : '',
		templateGlobs : '**/*.{htm,html,jade,pug,ejs,pug,handlebar,handlebars}'
	}, conf.html);

	var includes = [];

	var targetPath = conf.entryPath;
	var entryWalkOptions = {
		directories: false
	};

	var files = $walkSync(targetPath, {
		directories: false,
		globs : makeArray(conf.entryGlobs)
	});

	var getEntryKey = function(path){
		var extname = $path.extname(path);
		var key = $path.relative(targetPath, path);
		key = key.replace(new RegExp(extname + '$'), '');
		key = key.replace(/\\+/g, '/');
		return key;
	};

	var getEntryVal = function(path){
		var extname = $path.extname(path);
		var val = $path.relative(conf.rootPath, path);
		val = val.replace(new RegExp(extname + '$'), '');
		val = val.replace(/\\+/g, '/');
		return './' + val;
	};

	// 过滤文件列表
	if(Array.isArray(conf.filters)){
		conf.filters.forEach(function(fn){
			if(typeof fn === 'function'){
				files = files.filter(fn);
			}
		});
	}

	// 获取html模板文件列表
	var htmlFileMap = null;

	if(htmlConf.templatePath){
		htmlFileMap = {};
		var htmlFiles = $walkSync(htmlConf.templatePath, {
			directories: false,
			globs: makeArray(htmlConf.templateGlobs)
		});

		htmlFiles.forEach(function(file){
			var extname = $path.extname(file);
			var basePath = $path.join(
				$path.dirname(file),
				$path.basename(file, extname)
			);
			htmlFileMap[basePath] = file;
		});
	}

	// 遍历入口文件列表配置 webpack
	files.forEach(function(path){
		path = $path.resolve(targetPath, path);
		var key = getEntryKey(path);
		var val = getEntryVal(path);
		includes.push(key);

		if(!Array.isArray(webpackConfig.entry)){
			webpackConfig.entry[key] = val;
		}else{
			webpackConfig.entry.push(val);
		}

		if(!htmlFileMap){return;}

		// 如果有对应的html模板文件，则添加入口文件所匹配的模板
		if(htmlFileMap[key]){
			var htmlWebpackPluginOptions = {
				// favicon路径，通过webpack引入同时可以生成hash值
				// favicon: './src/img/favicon.ico',
				//生成的html存放路径，相对于path
				filename: $path.join(htmlConf.outputPath, key + '.html'),
				//html模板路径
				template: $path.join(htmlConf.templatePath, htmlFileMap[key]),
				//js插入的位置，true/'head'/'body'/false
				inject: 'body',
				//为静态资源生成hash值
				hash: false,
				//需要引入的chunk，不配置就会引入所有页面的资源
				chunks: [],
				// 配置 chunksSortMode 为 none 以确保JS按照 chunks 里面的顺序加载
				chunksSortMode: 'none',
				//压缩HTML文件
				minify: false
			};

			htmlWebpackPluginOptions.chunks.push(key);

			webpackConfig.plugins.push(
				//HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
				new $htmlWebpackPlugin(htmlWebpackPluginOptions)
			);
		}

	});

	webpackConfig.context = conf.rootPath;

	return webpackConfig;

}

module.exports = multiEntryResolve;
