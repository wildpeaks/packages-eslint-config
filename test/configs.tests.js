/* eslint-env node, mocha */
/* eslint-disable no-sync */
/* eslint-disable max-len */
'use strict';
const fs = require('fs');
const path = require('path');
const {strictEqual, deepStrictEqual, notDeepStrictEqual} = require('assert');
const {CLIEngine} = require('eslint');
const configs = require('..');
const {version} = require('../package.json');
const packages = path.join(__dirname, '../packages');
const fixtures = path.join(__dirname, 'fixtures');


function test_fixture(settings, id, fails){
	const code = fs.readFileSync(path.join(fixtures, `${id}.js`), 'utf8');
	const cli = new CLIEngine(settings);
	const report = cli.executeOnText(code);
	if (fails){
		notDeepStrictEqual(report.results[0].messages, [], `Fixture "${id}" should have errors`);
	} else {
		deepStrictEqual(report.results[0].messages, [], `Fixture "${id}" should pass`);
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
		settings.useEslintrc = false;

		test_fixture(settings, 'var', config.es2015);
		test_fixture(settings, 'implicit_global', true);

		test_fixture(settings, 'arrow_function_single_param_without_parens', !config.es2015 || config.flow);
		test_fixture(settings, 'arrow_function_single_param_with_parens', true);
		test_fixture(settings, 'arrow_function_multiple_params_without_type', !config.es2015 || config.flow);

		test_fixture(settings, 'class_empty', !config.es2015);
		test_fixture(settings, 'class_stage0_method_without_type', !config.es2015 || config.flow);
		test_fixture(settings, 'class_stage0_method_with_type', !config.flow);

		test_fixture(settings, 'flow_type_bool', true);
		test_fixture(settings, 'flow_type_boolean', !config.flow);
		test_fixture(settings, 'flow_type_boolean_primitive', true);
		test_fixture(settings, 'flow_type_number', !config.flow);
		test_fixture(settings, 'flow_type_number_primitive', true);
		test_fixture(settings, 'flow_type_string', !config.flow);
		test_fixture(settings, 'flow_type_string_primitive', true);

		// @warning There appears no way to force it to require a type on class properties
		// Probably will be available once it's out of stage2 phase.
		test_fixture(settings, 'class_stage2_instance_property_without_type', !config.flow);
		test_fixture(settings, 'class_stage2_static_property_without_type', !config.flow);

		test_fixture(settings, 'class_stage2_instance_function_method_without_type', true);
		test_fixture(settings, 'class_stage2_static_function_method_without_type', true);

		test_fixture(settings, 'class_stage2_instance_arrow_method_without_type', true);
		test_fixture(settings, 'class_stage2_static_arrow_method_without_type', true);


		test_fixture(settings, 'class_stage2_instance_property_with_type', !config.flow);
		test_fixture(settings, 'class_stage2_static_property_with_type', !config.flow);

		test_fixture(settings, 'class_stage2_instance_function_method_with_type', !config.flow);
		test_fixture(settings, 'class_stage2_static_function_method_with_type', !config.flow);

		// @warning I'd rather those failed because both instance and static function methods
		// get transpiled to smaller code than arrow methods.
		test_fixture(settings, 'class_stage2_instance_arrow_method_with_type', !config.flow);
		test_fixture(settings, 'class_stage2_static_arrow_method_with_type', !config.flow);

		test_fixture(settings, 'line_80', false);
		test_fixture(settings, 'line_120', false);
		test_fixture(settings, 'line_140', true);

		test_fixture(settings, 'without_env_node', true);
		test_fixture(settings, 'with_env_node', false);

		test_fixture(settings, 'without_env_browser', true);
		test_fixture(settings, 'with_env_browser', false);

		test_fixture(settings, 'without_env_mocha', true);
		test_fixture(settings, 'with_env_mocha', false);

		test_fixture(settings, 'commonjs', !config.commonjs);
		test_fixture(settings, 'export_var', !config.esmodules);
		test_fixture(settings, 'export_const', !config.esmodules);
		test_fixture(settings, 'export_arrow', true);
		test_fixture(settings, 'export_function', !config.esmodules);
		test_fixture(settings, 'export_default_var', !config.esmodules);
		test_fixture(settings, 'export_default_const', true);
		test_fixture(settings, 'export_default_arrow', !config.esmodules);
		test_fixture(settings, 'export_default_function', !config.esmodules);

		// @warning Cannot enable this test because it acts differently in CLI mode and in Node API mode:
		// https://github.com/zaggino/brackets-eslint/issues/51
		// test_fixture(settings, 'promise', !config.es2015);

		test_fixture(settings, 'react_jsx', !config.react && !config.flow);

		test_fixture(settings, 'await', !config.es2015);

		test_fixture(settings, 'quotes_property_inconsistent_single', true);
		test_fixture(settings, 'quotes_property_consistent_single', false);
		test_fixture(settings, 'quotes_property_backtick', true);
		test_fixture(settings, 'quotes_property_single', false);
		test_fixture(settings, 'quotes_backtick', !config.es2015);
		test_fixture(settings, 'quotes_single', false);
		test_fixture(settings, 'quotes_property_double', true);
		test_fixture(settings, 'quotes_double', true);

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

	for (const id in configs){
		it(id, test_package.bind(this, id));
	}
});
