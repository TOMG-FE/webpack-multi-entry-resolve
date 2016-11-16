var $fs = require('fs');
var $path = require('path');

var $chai = require('chai');
var $walkSync = require('walk-sync');

describe('files', function() {

	var files = $walkSync('./test/dist', {
		directories: false
	});

	it('should has target file', function() {
		$chai.expect(files).to.include('html/entry1/index.html');
		$chai.expect(files).to.include('html/entry2/index.html');
		$chai.expect(files).to.include('html/entry3/index.html');
		$chai.expect(files).to.include('js/entry1/index.js');
		$chai.expect(files).to.include('js/entry2/index.js');
		$chai.expect(files).to.include('js/entry3/index.js');
		$chai.expect(files).to.include('js/entry4/index.js');
	});

	it('should not has target file', function() {
		$chai.expect(files).to.not.include('html/entry1/mock.html');
		$chai.expect(files).to.not.include('html/entry4/index.html');
	});

});