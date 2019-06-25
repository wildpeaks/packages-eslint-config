/* eslint-env node, mocha */
/* eslint-disable no-sync */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
'use strict';
const fs = require('fs');
const path = require('path');
const {fail, strictEqual, deepStrictEqual} = require('assert');
const {CLIEngine} = require('eslint');
const configs = require('..');
const {version} = require('../package.json');
const dirPackages = path.join(__dirname, '../packages');
const dirFixtures = path.join(__dirname, 'fixtures');


function testPackage(packageId, done){
	const {commonjs, esmodules, es2017, typescript} = configs[packageId];

	// Describes when it's expected to fail (e.g. `true` means always, `false` means never).
	const fixtures = {
		'var.js': {
			expected: (es2017 || typescript) ? ['no-var'] : [],
			ignored: ['strict', 'no-implicit-globals']
		},

		'arrow_function_single_param_without_parens.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict']
		},
		'arrow_function_single_param_with_parens.js': {
			expected: es2017 ? ['arrow-parens'] : ['fatal'],
			ignored: ['strict']
		},
		'arrow_function_multiple_params_without_type.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict']
		},

		'class_empty.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'class_stage0_function_without_return_type.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'space-before-blocks', 'class-methods-use-this']
		},
		'class_stage0_function_with_return_type.js': {
			// expected: (stage2 || typescript) ? [] : ['fatal'],
			expected: (typescript) ? [] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'space-before-blocks', 'class-methods-use-this']
		},

		// 'class_stage2_instance_property_without_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_property_without_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_property_with_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_property_with_type.js': (stage2 || typescript) ? [] : ['fatal'],

		// 'class_stage2_instance_function_without_return_type.js': stage2 ? [] : (typescript ? ['no-invalid-this'] : ['fatal']),
		// 'class_stage2_static_function_without_return_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_arrow_without_return_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_arrow_without_return_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_expression_without_return_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_expression_without_return_type.js': (stage2 || typescript) ? [] : ['fatal'],

		// 'class_stage2_instance_function_with_return_type.js': stage2 ? [] : (typescript ? ['no-invalid-this'] : ['fatal']),
		// 'class_stage2_static_function_with_return_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_arrow_with_return_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_arrow_with_return_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_expression_with_return_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_expression_with_return_type.js': (stage2 || typescript) ? [] : ['fatal'],

		// 'class_stage2_instance_function_without_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_function_without_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_arrow_without_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_arrow_without_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_expression_without_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_expression_without_params_type.js': (stage2 || typescript) ? [] : ['fatal'],

		// 'class_stage2_instance_function_with_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_function_with_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_arrow_with_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_arrow_with_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_expression_with_params_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_expression_with_params_type.js': (stage2 || typescript) ? [] : ['fatal'],

		// 'class_stage2_instance_function_underscore_params_without_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_function_underscore_params_without_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_arrow_underscore_params_without_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_arrow_underscore_params_without_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_expression_underscore_params_without_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_expression_underscore_params_without_type.js': (stage2 || typescript) ? [] : ['fatal'],

		// 'class_stage2_instance_function_underscore_params_with_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_function_underscore_params_with_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_arrow_underscore_params_with_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_arrow_underscore_params_with_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_instance_expression_underscore_params_with_type.js': (stage2 || typescript) ? [] : ['fatal'],
		// 'class_stage2_static_expression_underscore_params_with_type.js': (stage2 || typescript) ? [] : ['fatal'],

		'line_80.js': {
			expected: [],
			ignored: ['strict']
		},
		'line_120.js': {
			expected: [],
			ignored: ['strict']
		},
		'line_240.js': {
			expected: [],
			ignored: ['strict']
		},
		'line_300.js': {
			expected: ['max-len'],
			ignored: ['strict']
		},

		'without_env_node.js': {
			expected: typescript ? [] : ['no-undef'],
			ignored: ['strict']
		},
		'with_env_node.js': {
			expected: [],
			ignored: ['strict']
		},

		'without_env_browser.js': {
			expected: typescript ? [] : ['no-undef'],
			ignored: ['strict']
		},
		'with_env_browser.js': {
			expected: [],
			ignored: ['strict']
		},

		'without_env_mocha.js': {
			expected: typescript ? [] : ['no-undef'],
			ignored: ['strict']
		},
		'with_env_mocha.js': {
			expected: [],
			ignored: ['strict']
		},

		'commonjs.js': {
			expected: commonjs ? [] : ['no-undef'],
			ignored: ['strict']
		},
		'export_var.js': {
			// expected: esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
			expected: esmodules ? [] : ['fatal'],
			ignored: ['strict', 'no-var']
		},
		'export_const.js': {
			// expected: esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
			expected: esmodules ? [] : ['fatal'],
			ignored: ['strict']
		},
		'export_arrow.js': {
			expected: ['fatal'],
			ignored: ['strict', 'arrow-body-style', 'space-before-blocks']
		},
		// 'export_function.js': esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
		// 'export_default_var.js': esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
		// 'export_default_const.js': ['fatal'],
		// 'export_default_arrow.js': esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),
		// 'export_default_function.js': esmodules ? [] : (stage2 ? ['no-restricted-syntax'] : ['fatal']),

		// // @warning Cannot enable this test because it acts differently in CLI mode and in Node API mode:
		// // https://github.com/zaggino/brackets-eslint/issues/51
		// // 'promise.js': es2017 ? [] : ['no-undef'],

		// // 'react_jsx.js': (stage2 || react) ? [] : ['fatal'],
		// 'await.js': es2017 ? [] : ['fatal'],

		// 'quotes_property_inconsistent_single.js': ['quote-props']
		// 'quotes_property_consistent_single.js': [],
		// 'quotes_property_backtick.js': ['fatal'],
		// 'quotes_property_single.js': [],
		// 'quotes_backtick.js': es2017 ? [] : ['fatal'],
		// 'quotes_single.js': [],
		// 'quotes_property_double.js': ['quotes'],
		// 'quotes_double.js': ['quotes'],

		// 'quotes_concatenate_number_number.js': [],
		// 'quotes_concatenate_number_string_single.js': [],
		// 'quotes_concatenate_number_string_double.js': ['quotes'],
		// 'quotes_concatenate_number_string_backtick.js': es2017 ? [] : ['fatal'],
		// 'quotes_concatenate_string_string_single.js': [],
		// 'quotes_concatenate_string_string_double.js': ['quotes'],
		// 'quotes_concatenate_string_string_backtick.js': es2017 ? [] : ['fatal'],

		// 'chained_two_methods_single_line.js': [],
		// 'chained_two_methods_multiple_lines.js': [],
		// 'chained_four_methods_single_line.js': [],
		// 'chained_four_methods_multiple_lines.js': [],
		// 'chained_six_methods_single_line.js': ['newline-per-chained-call'],
		// 'chained_six_methods_multiple_lines.js': [],

		// 'this_root.js': stage2 ? ['babel/no-invalid-this'] : ['no-invalid-this'],
		// 'this_function.js': [],
		// 'this_arrow.js': stage2 ? ['babel/no-invalid-this'] : (es2017 ? ['no-invalid-this'] : ['fatal']),
		// 'this_class_constructor.js': es2017 ? [] : ['fatal'],
		// 'this_class_method.js': es2017 ? [] : ['fatal'],
		// 'this_class_static.js': es2017 ? [] : ['fatal'], // @warning I'd rather always an error, but only checkJs catches that issue, not even "class-methods-use-this" rule

		// 'padding_class_beginning_zero_lines.js': es2017 ? [] : ['fatal'],
		// 'padding_class_beginning_one_line.js': es2017 ? [] : ['fatal'],
		// 'padding_class_beginning_two_lines.js': es2017 ? [] : ['fatal'], // @warning I'd rather always an error
		// 'padding_class_end_zero_lines.js': es2017 ? [] : ['fatal'],
		// 'padding_class_end_one_line.js': es2017 ? [] : ['fatal'], // @warning I'd rather always an error
		// 'padding_class_end_two_lines.js': es2017 ? [] : ['fatal'], // @warning I'd rather always an error

		// 'padding_class_method_beginning_zero_lines.js': es2017 ? [] : ['fatal'],
		// 'padding_class_method_beginning_one_line.js': es2017 ? [] : ['fatal'],
		// 'padding_class_method_beginning_two_lines.js': es2017 ? [] : ['fatal'], // @warning I'd rather always an error
		// 'padding_class_method_end_zero_lines.js': es2017 ? [] : ['fatal'],
		// 'padding_class_method_end_one_line.js': es2017 ? [] : ['fatal'], // @warning I'd rather always an error
		// 'padding_class_method_end_two_lines.js': es2017 ? [] : ['fatal'], // @warning I'd rather always an error

		// 'padding_function_beginning_zero_lines.js': [],
		// 'padding_function_beginning_one_line.js': [],
		// 'padding_function_beginning_two_lines.js': [], // @warning I'd rather always an error
		// 'padding_function_end_zero_lines.js': [],
		// 'padding_function_end_one_line.js': [], // @warning I'd rather always an error
		// 'padding_function_end_two_lines.js': [], // @warning I'd rather always an error

		// 'ternary.js': [],

		// 'typescript_type.ts': (stage2 || typescript) ? [] : ['fatal'],
		// 'typescript_enum.ts': typescript ? [] : ['fatal'],
		// 'typescript_interface.ts': (stage2 || typescript) ? [] : ['fatal'],
		// 'typescript_generic.ts': typescript ? [] : (stage2 ? ['space-before-blocks'] : ['fatal']),
		// 'typescript_optional_parameter.ts': typescript ? [] : (stage2 ? ['space-before-blocks'] : ['fatal']),
		// 'typescript_jsdoc.ts': typescript ? [] : (stage2 ? ['space-before-blocks'] : ['fatal']),

		// 'object_param_dot.js': es2017 ? ['prefer-destructuring'] : [],
		// 'object_param_bracket.js': es2017 ? ['prefer-destructuring'] : [],
		// 'object_param_destructured.js': es2017 ? [] : ['fatal'],
		// 'array_value_index.js': [],
		// 'array_destructured_first.js': es2017 ? [] : ['fatal'],
		// 'array_destructured_second.js': es2017 ? [] : ['fatal'],

		// 'unused_param_without_underscore_first.js': typescript ? [] : [],
		// 'unused_param_without_underscore_last.js': typescript ? ['@typescript-eslint/no-unused-vars'] : ['no-unused-vars'],
		// 'unused_param_with_underscore_first.js': typescript ? [] : [],
		// 'unused_param_with_underscore_last.js': typescript ? [] : [],
		// 'unused_var_without_underscore.js': typescript ? ['@typescript-eslint/no-unused-vars'] : ['no-unused-vars'],
		// 'unused_var_with_underscore.js': [],

		// // // I'd rather only variables starting with _ were ignored, but it's all of nothing
		// 'unused_rest_without_underscore.js': (typescript /*|| stage2 || react*/) ? [] : ['fatal'],
		// 'unused_rest_with_underscore.js': (typescript /*|| stage2 || react*/) ? [] : ['fatal']
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
			// console.log('-----------------------------------------------');
			// console.log(result.messages);
			// console.log('-----------------------------------------------');
			result.messages.forEach(message => {
				if (message.fatal){
					rules.fatal = message.message;
				} else {
					rules[message.ruleId] = message.message;
				}
			});
			const fixtureId = path.basename(result.filePath);
			actual[fixtureId] = rules;
		});

		for (const fixtureId in fixtures){
			const fixture = fixtures[fixtureId];
			const expectedErrors = fixture.expected;
			const ignoredErrors = fixture.ignored;
			const actualErrors = Object.keys(actual[fixtureId]);

			const messages = [];
			for (const expectedError of expectedErrors){
				if (!actualErrors.includes(expectedError)){
					messages.push(`MISSING "${expectedError}"`);
				}
			}
			for (const actualError of actualErrors){
				if (!expectedErrors.includes(actualError) && !ignoredErrors.includes(actualError)){
					messages.push(`UNEXPECTED "${actualError}"`);
				}
			}
			if (messages.length > 0){
				fail(messages.join(', '));
			}
		}

		done();
	});
}


describe('Packages', /* @this */ function(){
	this.slow(25000);
	this.timeout(30000);
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
