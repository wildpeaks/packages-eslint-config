/* eslint-env node, mocha */
'use strict';
const fs = require('fs');
const path = require('path');
const {deepStrictEqual} = require('assert');
const {CLIEngine} = require('eslint');
const configs = require('..');
const dirFixtures = path.join(__dirname, 'fixtures');


function runTest(configId){
	const {commonjs, esmodules, es2017, typescript} = configs[configId];

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
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type'] : (es2017 ? [] : ['fatal']),
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this']
		},

		'class_stage2_instance_property_without_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this'],
		},
		'class_stage2_static_property_without_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this']
		},

		'class_stage2_instance_function_without_return_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type', 'no-invalid-this'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this']
		},
		'class_stage2_static_function_without_return_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this']
		},
		'class_stage2_instance_arrow_without_return_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type', 'no-invalid-this'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this']
		},
		'class_stage2_static_arrow_without_return_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this']
		},
		'class_stage2_instance_expression_without_return_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type', 'no-invalid-this'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this']
		},
		'class_stage2_static_expression_without_return_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this']
		},

		'class_stage2_instance_function_without_params_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_static_function_without_params_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_instance_arrow_without_params_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_static_arrow_without_params_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_instance_expression_without_params_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_static_expression_without_params_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict','no-implicit-globals','no-unused-vars','@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},

		'class_stage2_instance_function_underscore_params_without_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_static_function_underscore_params_without_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_instance_arrow_underscore_params_without_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_static_arrow_underscore_params_without_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_instance_expression_underscore_params_without_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},
		'class_stage2_static_expression_underscore_params_without_type.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', '@typescript-eslint/explicit-function-return-type', 'class-methods-use-this']
		},

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
			expected: ['no-undef'],
			ignored: ['strict']
		},
		'with_env_node.js': {
			expected: [],
			ignored: ['strict']
		},

		'without_env_browser.js': {
			expected: ['no-undef'],
			ignored: ['strict']
		},
		'with_env_browser.js': {
			expected: [],
			ignored: ['strict']
		},

		'without_env_mocha.js': {
			expected: ['no-undef'],
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
			expected: esmodules ? ['no-var'] : ['fatal'],
			ignored: ['strict']
		},
		'export_const.js': {
			expected: esmodules ? [] : ['fatal'],
			ignored: ['strict']
		},
		'export_arrow.js': {
			expected: ['fatal'],
			ignored: ['strict', 'arrow-body-style']
		},
		'export_function.js': {
			expected: typescript ? ['@typescript-eslint/explicit-function-return-type'] : (esmodules ? [] : ['fatal']),
			ignored: ['strict']
		},
		'export_default_var.js': {
			expected: esmodules ? [] : ['fatal'],
			ignored: ['strict', 'no-var']
		},
		'export_default_const.js': {
			expected: ['fatal'],
			ignored: ['strict']
		},
		'export_default_arrow.js': {
			expected: typescript ? ['@typescript-eslint/explicit-function-return-type'] : (esmodules ? [] : ['fatal']),
			ignored: ['strict', 'arrow-body-style']
		},
		'export_default_function.js': {
			expected: typescript ? ['@typescript-eslint/explicit-function-return-type'] : (esmodules ? [] : ['fatal']),
			ignored: ['strict']
		},

		// @warning Cannot enable this test because it acts differently in CLI mode and in Node API mode:
		// https://github.com/zaggino/brackets-eslint/issues/51
		// 'promise.js': {
		// 	expected: es2017 ? [] : ['no-undef'],
		// 	ignored: ['strict']
		// },

		'jsx_without_require.jsx': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['strict']
		},
		'tsx_without_import.tsx': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['strict']
		},

		'await.js': {
			expected: typescript ? ['@typescript-eslint/explicit-function-return-type'] : (es2017 ? [] : ['fatal']),
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-implicit-globals']
		},

		'quotes_property_inconsistent_single.js': {
			expected: ['quotes', 'quote-props'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_property_consistent_single.js': {
			expected: ['quotes'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_property_inconsistent_double.js': {
			expected: ['quote-props'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_property_consistent_double.js': {
			expected: [],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_property_backtick.js': {
			expected: ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_property_single.js': {
			expected: ['quotes'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_backtick.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_single.js': {
			expected: ['quotes'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_property_double.js': {
			expected: [],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_double.js': {
			expected: [],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},

		'quotes_concatenate_number_number.js': {
			expected: [],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_concatenate_number_string_single.js': {
			expected: ['quotes'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_concatenate_number_string_double.js': {
			expected: [],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_concatenate_number_string_backtick.js': {
			expected: (es2017 ? [] : ['fatal']),
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_concatenate_string_string_single.js': {
			expected: ['quotes'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_concatenate_string_string_double.js': {
			expected: [],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'quotes_concatenate_string_string_backtick.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-implicit-globals', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},

		'chained_two_methods_single_line.js': {
			expected: [],
			ignored: ['strict']
		},
		'chained_two_methods_multiple_lines.js': {
			expected: [],
			ignored: ['strict']
		},
		'chained_four_methods_single_line.js': {
			expected: [],
			ignored: ['strict']
		},
		'chained_four_methods_multiple_lines.js': {
			expected: [],
			ignored: ['strict']
		},
		'chained_six_methods_single_line.js': {
			expected: ['newline-per-chained-call'],
			ignored: ['strict']
		},
		'chained_six_methods_multiple_lines.js': {
			expected: [],
			ignored: ['strict']
		},

		'this_root.js': {
			expected: ['no-invalid-this'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars', 'strict']
		},
		'this_function.js': {
			expected: typescript ? ['@typescript-eslint/explicit-function-return-type'] : [],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'this_arrow.js': {
			expected: typescript ? ['@typescript-eslint/explicit-function-return-type', 'no-invalid-this'] : (es2017 ? ['no-invalid-this'] : ['fatal']),
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'this_class_constructor.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility'] : (es2017 ? [] : ['fatal']),
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'this_class_method.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type'] : (es2017 ? [] : ['fatal']),
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'this_class_static.js': {
			expected: typescript ? ['@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type'] : (es2017 ? [] : ['fatal']),
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},

		'padding_class_beginning_zero_lines.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility']
		},
		'padding_class_beginning_one_line.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility']
		},
		'padding_class_beginning_two_lines.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility']
		},
		'padding_class_end_zero_lines.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility']
		},
		'padding_class_end_one_line.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility']
		},
		'padding_class_end_two_lines.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility']
		},

		'padding_class_method_beginning_zero_lines.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_class_method_beginning_one_line.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_class_method_beginning_two_lines.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_class_method_end_zero_lines.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_class_method_end_one_line.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_class_method_end_two_lines.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-member-accessibility', '@typescript-eslint/explicit-function-return-type']
		},

		'padding_function_beginning_zero_lines.js': {
			expected: [],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_function_beginning_one_line.js': {
			expected: [],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_function_beginning_two_lines.js': {
			expected: [],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_function_end_zero_lines.js': {
			expected: [],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_function_end_one_line.js': {
			expected: [],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-function-return-type']
		},
		'padding_function_end_two_lines.js': {
			expected: [],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'class-methods-use-this', '@typescript-eslint/explicit-function-return-type']
		},

		'ternary.js': {
			expected: [],
			ignored: ['strict', 'no-var', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},

		'typescript_enum_commas.ts': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'typescript_enum_semicolons.ts': {
			expected: ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},

		'typescript_type_union.ts': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'typescript_type_commas.ts': {
			expected: typescript ? ['@typescript-eslint/member-delimiter-style'] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'typescript_type_semicolons.ts': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},

		'typescript_interface_commas.ts': {
			expected: typescript ? ['@typescript-eslint/member-delimiter-style'] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'typescript_interface_semicolons.ts': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},

		'typescript_generic.ts': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'typescript_optional_parameter.ts': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'typescript_jsdoc.ts': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['no-unused-vars', '@typescript-eslint/no-unused-vars']
		},

		'object_param_dot.js': {
			expected: es2017 ? ['prefer-destructuring'] : [],
			ignored: ['strict', 'dot-notation', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'object_param_bracket.js': {
			expected: es2017 ? ['prefer-destructuring'] : [],
			ignored: ['strict', 'dot-notation', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'object_param_destructured.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'array_value_index.js': {
			expected: [],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'array_destructured_first.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},
		'array_destructured_second.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-unused-vars', '@typescript-eslint/no-unused-vars', 'no-var']
		},

		'unused_param_without_underscore_first.js': {
			expected: typescript ? [] : [],
			ignored: ['strict', '@typescript-eslint/explicit-function-return-type']
		},
		'unused_param_without_underscore_last.js': {
			expected: typescript ? ['@typescript-eslint/no-unused-vars'] : ['no-unused-vars'],
			ignored: ['strict', '@typescript-eslint/explicit-function-return-type']
		},
		'unused_param_with_underscore_first.js': {
			expected: [],
			ignored: ['strict', '@typescript-eslint/explicit-function-return-type']
		},
		'unused_param_with_underscore_last.js': {
			expected: [],
			ignored: ['strict', '@typescript-eslint/explicit-function-return-type']
		},
		'unused_var_without_underscore.js': {
			expected: typescript ? ['@typescript-eslint/no-unused-vars'] : ['no-unused-vars'],
			ignored: []
		},
		'unused_var_with_underscore.js': {
			expected: [],
			ignored: ['strict', 'no-var']
		},

		// I'd rather only variables starting with _ were ignored, but it's all of nothing
		'unused_rest_without_underscore.js': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['strict', 'no-var']
		},
		'unused_rest_with_underscore.js': {
			expected: typescript ? [] : ['fatal'],
			ignored: []
		},

		'require_var.js': {
			expected: es2017 ? ['no-var'] : [],
			ignored: ['strict', 'no-undef', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'require_destructure_var.js': {
			expected: typescript ? ['no-var'] : (es2017 ? ['no-var'] : ['fatal']),
			ignored: ['strict', 'no-undef', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'require_const.js': {
			expected: es2017 ? [] : ['fatal'],
			ignored: ['strict', 'no-undef', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'require_destructure_const.js': {
			expected: typescript ? [] : (es2017 ? [] : ['fatal']),
			ignored: ['strict', 'no-undef', 'no-unused-vars', '@typescript-eslint/no-unused-vars']
		},
		'require_import.js': {
			expected: typescript ? [] : ['fatal'],
			ignored: ['strict', '@typescript-eslint/no-unused-vars']
		},
		'require_destructure_import.js': {
			expected: ['fatal'],
			ignored: []
		}
	};

	const settings = require(`../packages/${configId}`); // eslint-disable-line global-require
	settings.useEslintrc = false;
	settings.extensions = ['.js', '.jsx', '.ts', '.tsx'];

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
		const messages = [];
		const actualFixture = actual[fixtureId];
		if ((actualFixture === null )|| (typeof actualFixture !== 'object')){
			messages.push('FIXTURE NOT FOUND');
		} else {
			const expectedFixture = fixtures[fixtureId];
			const expectedErrors = expectedFixture.expected;
			const ignoredErrors = expectedFixture.ignored;
			const actualErrors = Object.keys(actualFixture);
			for (const expectedError of expectedErrors){
				if (!actualErrors.includes(expectedError)){
					messages.push(`MISSING ${expectedError}`);
				}
			}
			for (const actualError of actualErrors){
				if (!expectedErrors.includes(actualError) && !ignoredErrors.includes(actualError)){
					messages.push(`UNEXPECTED ${actualError}`);
				}
			}
		}
		deepStrictEqual(messages, [], fixtureId);
	}
}


describe('Eslint', /* @this */ function(){
	this.slow(8000);
	this.timeout(10000);
	for (const configId in configs){
		it(configId, runTest.bind(this, configId));
	}
});
