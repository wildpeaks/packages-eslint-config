/* eslint-env node, mocha */
/* eslint-disable no-sync */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
'use strict';
const fs = require('fs');
const path = require('path');
const {strictEqual, deepStrictEqual} = require('assert');
const {CLIEngine} = require('eslint');
const configs = require('..');
const {version} = require('../package.json');
const dirPackages = path.join(__dirname, '../packages');
const dirFixtures = path.join(__dirname, 'fixtures');


function testPackage(packageId, done){
	const {commonjs, esmodules, stage2, es2017, react, typescript} = configs[packageId];

	// Describes when it's expected to fail (e.g. `true` means always, `false` means never).
	const expected = {
		var: es2017 ? ['no-var'] : [],

		arrow_function_single_param_without_parens: es2017 ? [] : ['fatal'],
		arrow_function_single_param_with_parens: es2017 ? ['arrow-parens'] : ['fatal'],
		arrow_function_multiple_params_without_type: es2017 ? [] : ['fatal'],

		class_empty: es2017 ? [] : ['fatal'],
		class_stage0_function_without_return_type: es2017 ? [] : ['fatal'],
		class_stage0_function_with_return_type: (stage2 || typescript) ? [] : ['fatal'],

		class_stage2_instance_property_without_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_property_without_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_property_with_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_property_with_type: (stage2 || typescript) ? [] : ['fatal'],

		class_stage2_instance_function_without_return_type: stage2 ? [] : (typescript ? ['no-invalid-this'] : ['fatal']),
		class_stage2_static_function_without_return_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_arrow_without_return_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_arrow_without_return_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_expression_without_return_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_expression_without_return_type: (stage2 || typescript) ? [] : ['fatal'],

		class_stage2_instance_function_with_return_type: stage2 ? [] : (typescript ? ['no-invalid-this'] : ['fatal']),
		class_stage2_static_function_with_return_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_arrow_with_return_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_arrow_with_return_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_expression_with_return_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_expression_with_return_type: (stage2 || typescript) ? [] : ['fatal'],

		class_stage2_instance_function_without_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_function_without_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_arrow_without_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_arrow_without_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_expression_without_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_expression_without_params_type: (stage2 || typescript) ? [] : ['fatal'],

		class_stage2_instance_function_with_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_function_with_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_arrow_with_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_arrow_with_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_expression_with_params_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_expression_with_params_type: (stage2 || typescript) ? [] : ['fatal'],

		class_stage2_instance_function_underscore_params_without_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_function_underscore_params_without_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_arrow_underscore_params_without_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_arrow_underscore_params_without_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_expression_underscore_params_without_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_expression_underscore_params_without_type: (stage2 || typescript) ? [] : ['fatal'],

		class_stage2_instance_function_underscore_params_with_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_function_underscore_params_with_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_arrow_underscore_params_with_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_arrow_underscore_params_with_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_instance_expression_underscore_params_with_type: (stage2 || typescript) ? [] : ['fatal'],
		class_stage2_static_expression_underscore_params_with_type: (stage2 || typescript) ? [] : ['fatal'],

		line_80: [],
		line_120: [],
		line_140: ['max-len'],

		without_env_node: typescript ? [] : ['no-undef'],
		with_env_node: [],

		without_env_browser: typescript ? [] : ['no-undef'],
		with_env_browser: [],

		without_env_mocha: typescript ? [] : ['no-undef'],
		with_env_mocha: [],

		commonjs: commonjs ? [] : ['no-undef'],
		export_var: esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
		export_const: esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
		export_arrow: ['fatal'],
		export_function: esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
		export_default_var: esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
		export_default_const: ['fatal'],
		export_default_arrow: esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
		export_default_function: esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),

		// @warning Cannot enable this test because it acts differently in CLI mode and in Node API mode:
		// https://github.com/zaggino/brackets-eslint/issues/51
		// promise: es2017 ? [] : ['no-undef'],

		react_jsx: (stage2 || react) ? [] : ['fatal'],
		await: es2017 ? [] : ['fatal'],

		quotes_property_inconsistent_single: ['quote-props'],
		quotes_property_consistent_single: [],
		quotes_property_backtick: ['fatal'],
		quotes_property_single: [],
		quotes_backtick: es2017 ? [] : ['fatal'],
		quotes_single: [],
		quotes_property_double: ['quotes'],
		quotes_double: ['quotes'],

		quotes_concatenate_number_number: [],
		quotes_concatenate_number_string_single: es2017 ? ['prefer-template'] : [],
		quotes_concatenate_number_string_double: es2017 ? ['prefer-template', 'quotes'] : ['quotes'],
		quotes_concatenate_number_string_backtick: es2017 ? [] : ['fatal'],
		quotes_concatenate_string_string_single: es2017 ? ['prefer-template'] : [],
		quotes_concatenate_string_string_double: es2017 ? ['prefer-template', 'quotes'] : ['quotes'],
		quotes_concatenate_string_string_backtick: es2017 ? [] : ['fatal'],

		chained_two_methods_single_line: [],
		chained_two_methods_multiple_lines: [],
		chained_four_methods_single_line: [],
		chained_four_methods_multiple_lines: [],
		chained_six_methods_single_line: ['newline-per-chained-call'],
		chained_six_methods_multiple_lines: [],

		this_root: stage2 ? ['babel/no-invalid-this'] : ['no-invalid-this'],
		this_function: [],
		this_arrow: stage2 ? ['babel/no-invalid-this'] : (es2017 ? ['no-invalid-this'] : ['fatal']),
		this_class_constructor: es2017 ? [] : ['fatal'],
		this_class_method: es2017 ? [] : ['fatal'],
		this_class_static: es2017 ? [] : ['fatal'], // @warning I'd rather always an error, but only checkJs catches that issue, not even "class-methods-use-this" rule

		padding_class_beginning_zero_lines: es2017 ? [] : ['fatal'],
		padding_class_beginning_one_line: es2017 ? [] : ['fatal'],
		padding_class_beginning_two_lines: es2017 ? [] : ['fatal'], // @warning I'd rather always an error
		padding_class_end_zero_lines: es2017 ? [] : ['fatal'],
		padding_class_end_one_line: es2017 ? [] : ['fatal'], // @warning I'd rather always an error
		padding_class_end_two_lines: es2017 ? [] : ['fatal'], // @warning I'd rather always an error

		padding_class_method_beginning_zero_lines: es2017 ? [] : ['fatal'],
		padding_class_method_beginning_one_line: es2017 ? [] : ['fatal'],
		padding_class_method_beginning_two_lines: es2017 ? [] : ['fatal'], // @warning I'd rather always an error
		padding_class_method_end_zero_lines: es2017 ? [] : ['fatal'],
		padding_class_method_end_one_line: es2017 ? [] : ['fatal'], // @warning I'd rather always an error
		padding_class_method_end_two_lines: es2017 ? [] : ['fatal'], // @warning I'd rather always an error

		padding_function_beginning_zero_lines: [],
		padding_function_beginning_one_line: [],
		padding_function_beginning_two_lines: [], // @warning I'd rather always an error
		padding_function_end_zero_lines: [],
		padding_function_end_one_line: [], // @warning I'd rather always an error
		padding_function_end_two_lines: [], // @warning I'd rather always an error

		ternary: []

		//
		// TODO typescript tests
		//
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
		settings.extensions = ['.js', '.ts'];

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
			const expectedError = expected[fixtureId].sort();
			const actualError = Object.keys(actual[fixtureId]).sort();
			if (expectedError.length > 0){
				deepStrictEqual(actualError, expectedError, `Fixture "${fixtureId}" should have errors`);
			} else {
				deepStrictEqual(actualError, [], `Fixture "${fixtureId}" should pass`);
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
	// for (const id in configs){
	// 	it(id, testPackage.bind(this, id));
	// }
	it('eslint-config-typescript', testPackage.bind(this, 'eslint-config-typescript')); //TODELETE
});
