/* eslint-env node, mocha */
/* eslint-disable no-sync */
'use strict';
const fs = require('fs');
const path = require('path');
const {strictEqual} = require('assert');
const configs = require('..');
const {version} = require('../package.json');
const folderPackages = path.join(__dirname, '../packages');


function test_package(id, done){
	const folder = path.join(folderPackages, id);
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
		let eslintSettings;
		try {
			eslintSettings = require(`../packages/${id}`); // eslint-disable-line global-require
		} catch(e){
			throws = true;
		}
		strictEqual(throws, false, 'Package can be required');
		strictEqual(typeof eslintSettings, 'object', 'Package exports an Object');

		//
		// TODO test every fixture against the eslint config
		//

		done();
	});
}


describe('Packages', () => {
	before(done => {
		fs.access(folderPackages, fs.constants.R_OK, err => {
			strictEqual(err, null, 'Folder packages exists');
			done();
		});
	});
	for (const id in configs){
		it(id, test_package.bind(null, id));
	}
});
