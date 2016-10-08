var $path = require('path');
var $fs = require('fs');
var $walkSync = require('walk-sync');

function multiEntryResolve(webpackConfig, options){

	var conf = {
		'entryPath' : './',
		'rootPath' : process.cwd(),
		'filters' : [
			function(file){
				return $path.extname(file) === '.js';
			}
		]
	};

	options = options || '';
	conf.entryPath =  options.entryPath || conf.entryPath;
	conf.rootPath = options.rootPath || conf.rootPath;
	conf.filters = options.filters || conf.filters;

	var includes = [];

	var targetPath = conf.entryPath;
	var files = $walkSync(targetPath, {
		directories: false
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

	if(Array.isArray(conf.filters)){
		conf.filters.forEach(function(fn){
			if(typeof fn === 'function'){
				files = files.filter(fn);
			}
		});
	}

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
	});

	webpackConfig.context = conf.rootPath;

	return webpackConfig;

}

module.exports = multiEntryResolve;
