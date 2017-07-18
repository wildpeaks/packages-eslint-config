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
	const {commonjs, esmodules, stage2, es2015, react, flow} = configs[packageId];
	const babelParser = flow || stage2;
	const expected = {
		var: es2015,

		arrow_function_single_param_without_parens: !es2015 || flow,
		arrow_function_single_param_with_parens: true,
		arrow_function_multiple_params_without_type: !es2015 || flow,

		class_empty: !es2015,
		class_stage0_function_without_return_type: !es2015 || flow,
		class_stage0_function_with_return_type: !babelParser,

		flow_type_bool: !babelParser || flow,
		flow_type_boolean: !babelParser,
		flow_type_boolean_primitive: !babelParser || flow,
		flow_type_number: !babelParser,
		flow_type_number_primitive: !babelParser || flow,
		flow_type_string: !babelParser,
		flow_type_string_primitive: !babelParser || flow,
		flow_type_void: !babelParser,
		flow_return_type_void: !babelParser,
		flow_type_undefined: true,
		flow_return_type_undefined: true,

		flow_type_lowercase: !babelParser || flow,
		flow_type_uppercase: !babelParser || flow,
		flow_type_lower_camelcase: !babelParser || flow,
		flow_type_upper_camelcase: !babelParser,
		flow_type_number_lower_camelcase: true,
		flow_type_number_upper_camelcase: true,
		flow_type_single_letter_lowercase: !babelParser || flow,
		flow_type_single_letter_uppercase: !babelParser || flow,

		// @warning There appears no way to force it to require a type on class properties.
		// Probably will be available once it's out of stage2 phase.
		class_stage2_instance_property_without_type: !babelParser,
		class_stage2_static_property_without_type: !babelParser,
		class_stage2_instance_property_with_type: !babelParser,
		class_stage2_static_property_with_type: !babelParser,

		class_stage2_instance_function_without_return_type: !babelParser || flow,
		class_stage2_static_function_without_return_type: !babelParser || flow,
		class_stage2_instance_arrow_without_return_type: !babelParser || flow,
		class_stage2_static_arrow_without_return_type: !babelParser || flow,
		class_stage2_instance_expression_without_return_type: !babelParser,
		class_stage2_static_expression_without_return_type: !babelParser,

		// @warning I would prefer "instance function" always fails (because it should use arrow or expression),
		// but there is no rule for that yet.
		class_stage2_instance_function_with_return_type: !babelParser,
		class_stage2_static_function_with_return_type: !babelParser,
		class_stage2_instance_arrow_with_return_type: !babelParser,
		class_stage2_static_arrow_with_return_type: !babelParser,
		class_stage2_instance_expression_with_return_type: !babelParser,
		class_stage2_static_expression_with_return_type: !babelParser,

		class_stage2_instance_function_without_params_type: !babelParser || flow,
		class_stage2_static_function_without_params_type: !babelParser || flow,
		class_stage2_instance_arrow_without_params_type: !babelParser || flow,
		class_stage2_static_arrow_without_params_type: !babelParser || flow,
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
		// promise: !es2015,

		react_jsx: !babelParser && !react,
		await: !es2015,

		quotes_property_inconsistent_single: true,
		quotes_property_consistent_single: false,
		quotes_property_backtick: true,
		quotes_property_single: false,
		quotes_backtick: !es2015,
		quotes_single: false,
		quotes_property_double: true,
		quotes_double: true
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
