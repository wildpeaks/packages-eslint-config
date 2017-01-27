/* eslint-env node, mocha */
/* eslint-disable no-sync */
'use strict';
const fs = require('fs');
const path = require('path');
const {strictEqual, deepStrictEqual} = require('assert');
const {linter} = require('eslint');
const configs = require('..');
const {version} = require('../package.json');
const packages = path.join(__dirname, '../packages');
const fixtures = path.join(__dirname, 'fixtures');


function test_fixture(settings, id, fails){
	const code = fs.readFileSync(path.join(fixtures, `${id}.js`), 'utf8');
	const errors = linter.verify(code, settings, {filename: 'fake.js'});
	if (fails){
		strictEqual(errors.length > 0, true, `Fixture: ${id}`);
	} else {
		deepStrictEqual(errors, [], `Fixture: ${id}`);
	}
}


function test_package(id, done){
	const config = configs[id];
	const folder = path.join(packages, id);
	fs.access(folder, fs.constants.R_OK, folderError => {
		strictEqual(folderError, null, 'Folder exists');

		let throws = false;
		let packageJson;
		try {
			packageJson = JSON.parse(
				fs.readFileSync(path.join(folder, 'package.json'), 'utf8')
			);
		} catch(e){
			throws = true;
		}
		strictEqual(throws, false, 'package.json can be read');
		strictEqual(typeof packageJson, 'object', 'packageJson is a JSON Object');
		strictEqual(packageJson.name, `@wildpeaks/${id}`, 'package.name');
		strictEqual(packageJson.main, 'settings.js', 'package.main');
		strictEqual(packageJson.version, version, 'package.version');

		throws = false;
		try {
			fs.readFileSync(path.join(folder, 'settings.js'), 'utf8');
		} catch(e){
			throws = true;
		}
		strictEqual(throws, false, 'settings.js can be read');

		throws = false;
		try {
			fs.readFileSync(path.join(folder, 'README.md'), 'utf8');
		} catch(e){
			throws = true;
		}
		strictEqual(throws, false, 'README.md can be read');

		throws = false;
		let settings;
		try {
			settings = require(`../packages/${id}`); // eslint-disable-line global-require
		} catch(e){
			throws = true;
		}
		strictEqual(throws, false, 'Package can be required');
		strictEqual(typeof settings, 'object', 'Package exports an Object');

		test_fixture(settings, 'var', config.es2015);
		test_fixture(settings, 'implicit_global', true);
		test_fixture(settings, 'arrow_function_single_param_without_parens', !config.es2015 && !config.flow);
		test_fixture(settings, 'arrow_function_single_param_with_parens', true);
		test_fixture(settings, 'arrow_function_multiple_params', !config.es2015);

		//
		// async
		// class
		// commonjs
		// esmodule
		// flow
		// line-80
		// line-140
		// line-200
		// react-jsx
		// without-env-node
		// with-env-node
		// without-env-browser
		// with-env-browser
		// without-env-mocha
		// with-env-mocha
		//

		done();
	});
}


describe('Packages', /* @this */ function(){
	this.slow(1000);
	this.timeout(2000);

	before(done => {
		fs.access(packages, fs.constants.R_OK, err => {
			strictEqual(err, null, 'Folder packages exists');
			done();
		});
	});

	// it('eslint-config-legacy', test_package.bind(this, 'eslint-config-legacy')); // TODELETE
	for (const id in configs){
		it(id, test_package.bind(this, id));
	}
});
