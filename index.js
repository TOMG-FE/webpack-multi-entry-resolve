var $path = require('path');
var $fs = require('fs');

function webpackPathResolve(webpackConfig, options){

	var conf = {
		'entryPath' : './entry',
		'rootPath' : './'
	};

	var includes = [];

	var targetPath = $path.join($CONFIG.src, 'entry');
	var files = $util.walkSync(targetPath);

	var getEntryKey = function(path){
		var extname = $path.extname(path);
		var key = $path.relative(targetPath, path);
		key = key.replace(new RegExp(extname + '$'), '');
		key = key.replace(/\\+/g, '/');
		return key;
	};

	var getEntryVal = function(path){
		var extname = $path.extname(path);
		var val = $path.relative($CONFIG.root, path);
		val = val.replace(new RegExp(extname + '$'), '');
		val = val.replace(/\\+/g, '/');
		return './' + val;
	};

	files.filter(function(file){
		return $path.extname(file) === '.js';
	}).forEach(function(path){
		var key = getEntryKey(path);
		var val = getEntryVal(path);
		includes.push(key);

		if(!Array.isArray(webpackConfig.entry)){
			webpackConfig.entry[key] = val;
		}else{
			webpackConfig.entry.push(val);
		}
	});

	return webpackConfig;

}

module.exports = webpackPathResolve;
