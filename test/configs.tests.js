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
const dirPackages = path.join(__dirname, '../packages');
const dirFixtures = path.join(__dirname, 'fixtures');


function testPackage(packageId, done){
	const {commonjs, esmodules, stage2, es2017, react} = configs[packageId];
	const babelParser = stage2;

	// Describes when it's expected to fail (e.g. `true` means always, `false` means never).
	const expected = {
		var: es2017,

		arrow_function_single_param_without_parens: !es2017,
		arrow_function_single_param_with_parens: true,
		arrow_function_multiple_params_without_type: !es2017,

		class_empty: !es2017,
		class_stage0_function_without_return_type: !es2017,
		class_stage0_function_with_return_type: !babelParser,

		class_stage2_instance_property_without_type: !babelParser,
		class_stage2_static_property_without_type: !babelParser,
		class_stage2_instance_property_with_type: !babelParser,
		class_stage2_static_property_with_type: !babelParser,

		class_stage2_instance_function_without_return_type: !babelParser,
		class_stage2_static_function_without_return_type: !babelParser,
		class_stage2_instance_arrow_without_return_type: !babelParser,
		class_stage2_static_arrow_without_return_type: !babelParser,
		class_stage2_instance_expression_without_return_type: !babelParser,
		class_stage2_static_expression_without_return_type: !babelParser,

		class_stage2_instance_function_with_return_type: !babelParser,
		class_stage2_static_function_with_return_type: !babelParser,
		class_stage2_instance_arrow_with_return_type: !babelParser,
		class_stage2_static_arrow_with_return_type: !babelParser,
		class_stage2_instance_expression_with_return_type: !babelParser,
		class_stage2_static_expression_with_return_type: !babelParser,

		class_stage2_instance_function_without_params_type: !babelParser,
		class_stage2_static_function_without_params_type: !babelParser,
		class_stage2_instance_arrow_without_params_type: !babelParser,
		class_stage2_static_arrow_without_params_type: !babelParser,
		class_stage2_instance_expression_without_params_type: !babelParser,
		class_stage2_static_expression_without_params_type: !babelParser,

		class_stage2_instance_function_with_params_type: !babelParser,
		class_stage2_static_function_with_params_type: !babelParser,
		class_stage2_instance_arrow_with_params_type: !babelParser,
		class_stage2_static_arrow_with_params_type: !babelParser,
		class_stage2_instance_expression_with_params_type: !babelParser,
		class_stage2_static_expression_with_params_type: !babelParser,

		class_stage2_instance_function_underscore_params_without_type: !babelParser,
		class_stage2_static_function_underscore_params_without_type: !babelParser,
		class_stage2_instance_arrow_underscore_params_without_type: !babelParser,
		class_stage2_static_arrow_underscore_params_without_type: !babelParser,
		class_stage2_instance_expression_underscore_params_without_type: !babelParser,
		class_stage2_static_expression_underscore_params_without_type: !babelParser,

		class_stage2_instance_function_underscore_params_with_type: !babelParser,
		class_stage2_static_function_underscore_params_with_type: !babelParser,
		class_stage2_instance_arrow_underscore_params_with_type: !babelParser,
		class_stage2_static_arrow_underscore_params_with_type: !babelParser,
		class_stage2_instance_expression_underscore_params_with_type: !babelParser,
		class_stage2_static_expression_underscore_params_with_type: !babelParser,

		line_80: false,
		line_120: false,
		line_140: true,

		without_env_node: true,
		with_env_node: false,

		without_env_browser: true,
		with_env_browser: false,

		without_env_mocha: true,
		with_env_mocha: false,

		commonjs: !commonjs,
		export_var: !esmodules,
		export_const: !esmodules,
		export_arrow: true,
		export_function: !esmodules,
		export_default_var: !esmodules,
		export_default_const: true,
		export_default_arrow: !esmodules,
		export_default_function: !esmodules,

		// @warning Cannot enable this test because it acts differently in CLI mode and in Node API mode:
		// https://github.com/zaggino/brackets-eslint/issues/51
		// promise: !es2017,

		react_jsx: !babelParser && !react,
		await: !es2017,

		quotes_property_inconsistent_single: true,
		quotes_property_consistent_single: false,
		quotes_property_backtick: true,
		quotes_property_single: false,
		quotes_backtick: !es2017,
		quotes_single: false,
		quotes_property_double: true,
		quotes_double: true,

		chained_two_methods_single_line: false,
		chained_two_methods_multiple_lines: false,
		chained_four_methods_single_line: false,
		chained_four_methods_multiple_lines: false,
		chained_six_methods_single_line: true,
		chained_six_methods_multiple_lines: false,

		this_root: true,
		this_function: false,
		this_arrow: true,
		this_class_constructor: !es2017,
		this_class_method: !es2017,
		this_class_static: !es2017, // @warning I'd rather `true`, but only checkJs catches that issue, not even "class-methods-use-this" rule

		padding_class_beginning_zero_lines: !es2017,
		padding_class_beginning_one_line: !es2017,
		padding_class_beginning_two_lines: !es2017, // @warning I'd rather `true`
		padding_class_end_zero_lines: !es2017,
		padding_class_end_one_line: !es2017, // @warning I'd rather `true`
		padding_class_end_two_lines: !es2017, // @warning I'd rather `true`

		padding_class_method_beginning_zero_lines: !es2017,
		padding_class_method_beginning_one_line: !es2017,
		padding_class_method_beginning_two_lines: !es2017, // @warning I'd rather `true`
		padding_class_method_end_zero_lines: !es2017,
		padding_class_method_end_one_line: !es2017, // @warning I'd rather `true`
		padding_class_method_end_two_lines: !es2017, // @warning I'd rather `true`

		padding_function_beginning_zero_lines: false,
		padding_function_beginning_one_line: false,
		padding_function_beginning_two_lines: false, // @warning I'd rather `true`
		padding_function_end_zero_lines: false,
		padding_function_end_one_line: false, // @warning I'd rather `true`
		padding_function_end_two_lines: false // @warning I'd rather `true`
	};

	const folder = path.join(dirPackages, packageId);
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
		strictEqual(packageJson.name, `@wildpeaks/${packageId}`, 'package.name');
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
			settings = require(`../packages/${packageId}`); // eslint-disable-line global-require
		} catch(e){
			throws = true;
		}
		strictEqual(throws, false, 'Package can be required');
		strictEqual(typeof settings, 'object', 'Package exports an Object');
		settings.useEslintrc = false;

		// Real configs need an Object, CLIEngine needs an Array.
		// @see https://github.com/eslint/eslint/issues/892
		// @see https://github.com/eslint/eslint/pull/6922
		// @see https://github.com/eslint/eslint/issues/7967
		if (typeof settings.globals === 'object'){
			settings.globals = Object.keys(settings.globals);
		}

		const cli = new CLIEngine(settings);
		const report = cli.executeOnFiles([dirFixtures]);
		const actual = {};
		report.results.forEach(result => {
			const rules = {};
			result.messages.forEach(message => {
				if (message.fatal){
					rules.fatal = message.message;
				} else {
					rules[message.ruleId] = message.message;
				}
			});
			const fixtureId = path.basename(result.filePath, '.js');
			actual[fixtureId] = rules;
		});

		for (const fixtureId in expected){
			const expectedError = expected[fixtureId];
			const actualError = actual[fixtureId];
			const rules = Object.keys(actualError);
			if (expectedError){
				notDeepStrictEqual(rules, [], `Fixture "${fixtureId}" should have errors`);
			} else {
				deepStrictEqual(rules, [], `Fixture "${fixtureId}" should pass`);
			}
		}

		done();
	});
}


describe('Packages', /* @this */ function(){
	this.slow(3000);
	this.timeout(5000);
	before(done => {
		fs.access(dirPackages, fs.constants.R_OK, err => {
			strictEqual(err, null, 'Folder "packages" exists');
			done();
		});
	});
	for (const id in configs){
		it(id, testPackage.bind(this, id));
	}
});
