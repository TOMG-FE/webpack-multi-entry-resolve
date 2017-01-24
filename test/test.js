var $fs = require('fs');

var $chai = require('chai');
var $walkSync = require('walk-sync');
var $mocha = require('mocha');

var describe = $mocha.describe;
var it = $mocha.it;

describe('files', function() {

	var files = $walkSync('./test/dist', {
		directories: false
	});

	it('应该输出一批文件', function() {
		var outputFiles = [
			'html/entry1/index.html',
			'html/entry2/index.html',
			'html/entry3/index.html',
			'js/entry1/index.js',
			'js/entry2/index.js',
			'js/entry3/index.js',
			'js/entry4/index.js',
			'js/global/global.js'
		];
		outputFiles.forEach(function(file) {
			$chai.expect(files).to.include(file);
		});
	});

	it('没有对应路径js的模板文件将被忽略', function() {
		$chai.expect(files).to.not.include('html/entry1/notuse.html');
	});

	it('输出的模板文件应当载入对应的js文件', function() {
		var entry1html = $fs.readFileSync('./test/dist/html/entry1/index.html', 'utf8');
		$chai.expect(entry1html).to.contain('../../js/entry1/index.js');
	});

	it('输出的模板文件应当载入公共js文件', function() {
		var entry1html = $fs.readFileSync('./test/dist/html/entry1/index.html', 'utf8');
		$chai.expect(entry1html).to.contain('../../js/global/global.js');
	});

	it('mock数据能够被渲染到模板', function() {
		var entry2html = $fs.readFileSync('./test/dist/html/entry2/index.html', 'utf8');
		$chai.expect(entry2html).to.contain('titleForM1');
	});

	it('mock数据支持模块化', function() {
		var entry2html = $fs.readFileSync('./test/dist/html/entry2/index.html', 'utf8');
		$chai.expect(entry2html).to.contain('Hello M1!');
	});

});

