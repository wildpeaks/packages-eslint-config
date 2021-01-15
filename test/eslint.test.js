/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
"use strict";
const {deepStrictEqual} = require("assert");
const {readFileSync, writeFileSync, unlinkSync} = require("fs");
const {emptyDir} = require("fs-extra");
const {join} = require("path");
const {ESLint} = require("eslint");
const tmpFolder = join(process.cwd(), "tmp");
const fixturesFolder = join(__dirname, "eslint");

const fixtures = {
	"var.js": {
		expected: {
			legacy: [],
			commonjs: ["no-var"],
			typescript: ["no-var"]
		},
		ignored: ["strict"]
	},

	"arrow_function_single_param_without_parens.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["arrow-parens"],
			typescript: ["arrow-parens"]
		},
		ignored: ["strict"]
	},
	"arrow_function_single_param_with_parens.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"arrow_function_multiple_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},

	"class_empty.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"class_stage0_function_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: [
				"@typescript-eslint/explicit-function-return-type",
				"@typescript-eslint/explicit-member-accessibility"
			]
		},
		ignored: ["strict", "class-methods-use-this", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},

	"class_stage2_instance_property_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_property_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},

	"class_stage2_instance_function_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_function_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_instance_arrow_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_arrow_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_instance_expression_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_expression_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},

	"class_stage2_instance_function_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_function_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_instance_arrow_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_arrow_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_instance_expression_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_expression_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},

	"class_stage2_instance_function_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_function_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_instance_arrow_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_arrow_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_instance_expression_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"class_stage2_static_expression_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},

	"line_80.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"line_120.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"line_150.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"line_240.js": {
		expected: {
			legacy: ["max-len"],
			commonjs: ["max-len"],
			typescript: ["max-len"]
		},
		ignored: ["strict"]
	},

	"without_env_node.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			typescript: ["no-undef"]
		},
		ignored: ["strict"]
	},
	"with_env_node.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},

	"without_env_browser.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			typescript: ["no-undef"]
		},
		ignored: ["strict"]
	},
	"with_env_browser.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},

	"without_env_mocha.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			typescript: ["no-undef"]
		},
		ignored: ["strict"]
	},
	"with_env_mocha.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},

	"commonjs.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"export_var.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["no-var"]
		},
		ignored: []
	},
	"export_const.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"export_arrow.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},
	"export_function.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/explicit-function-return-type"]
	},
	"export_default_var.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["no-var"]
		},
		ignored: []
	},
	"export_default_const.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},
	"export_default_arrow.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/explicit-function-return-type", "arrow-body-style"]
	},
	"export_default_function.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/explicit-function-return-type"]
	},
	"export_default_number.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: []
	},

	"promise.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},

	"jsx_without_require.jsx": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"tsx_without_import.tsx": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: []
	},

	"await_toplevel.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"await_import.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: [] // TODO I wish it would detect toplevel await
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"await_in_loop.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},

	"async_function.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"async_arrow_without_space.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["space-before-function-paren"],
			typescript: ["@typescript-eslint/space-before-function-paren"]
		},
		ignored: ["strict", "no-undef"]
	},
	"async_arrow_with_space.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-undef"]
	},

	"quotes_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_backtick.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"quotes_property_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_backtick.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},

	"quotes_property_inconsistent_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_consistent_single.js": {
		expected: {
			legacy: ["quotes", "quote-props"],
			commonjs: ["quotes", "quote-props"],
			typescript: ["@typescript-eslint/quotes", "quote-props"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_inconsistent_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_consistent_double.js": {
		expected: {
			legacy: ["quote-props"],
			commonjs: ["quote-props"],
			typescript: ["quote-props"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"quotes_property_mixed_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_mixed_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"quotes_concatenate_number_number.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_number_string_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_number_string_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_number_string_backtick.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_string_string_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_string_string_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_string_string_backtick.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"chained_two_methods_single_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"chained_two_methods_multiple_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"chained_four_methods_single_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"chained_four_methods_multiple_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},
	"chained_six_methods_single_line.js": {
		expected: {
			legacy: ["newline-per-chained-call"],
			commonjs: ["newline-per-chained-call"],
			typescript: ["newline-per-chained-call"]
		},
		ignored: ["strict"]
	},
	"chained_six_methods_multiple_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict"]
	},

	"this_root.js": {
		expected: {
			legacy: ["no-invalid-this"],
			commonjs: ["no-invalid-this"],
			typescript: []
		},
		ignored: []
	},
	"this_function.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"this_arrow.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["no-invalid-this"],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"this_class_constructor.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"this_class_method.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"this_class_static.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},

	"padding_class_beginning_zero_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_beginning_one_line.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_beginning_two_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_end_zero_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_end_one_line.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_end_two_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},

	"padding_class_method_beginning_zero_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_beginning_one_line.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_beginning_two_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_end_zero_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_end_one_line.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_end_two_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},

	"padding_function_beginning_zero_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_beginning_one_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_beginning_two_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_end_zero_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_end_one_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_end_two_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},

	"ternary.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"ts_enum_commas.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_enum_semicolons.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},

	"ts_type_union.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_type_commas.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"ts_type_semicolons.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"ts_interface_commas.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style"]
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_interface_semicolons.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"ts_generic.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_optional_parameter.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_jsdoc.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"destructuring_declare_object_param_dot.js": {
		expected: {
			legacy: [],
			commonjs: ["prefer-destructuring"],
			typescript: ["prefer-destructuring"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_object_param_dot.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_object_param_bracket.js": {
		expected: {
			legacy: [],
			commonjs: ["prefer-destructuring"],
			typescript: ["prefer-destructuring"]
		},
		ignored: ["strict", "no-unused-vars", "no-var", "dot-notation", "@typescript-eslint/dot-notation", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_object_param_bracket.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "dot-notation", "@typescript-eslint/dot-notation", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_object_param_destructured.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_object_param_destructured.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_array_value_index.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_array_value_index.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_array_destructured_first.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_array_destructured_first.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_array_destructured_second.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_array_destructured_second.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"unused_param_without_underscore_first.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["@typescript-eslint/explicit-function-return-type"]
	},
	"unused_param_without_underscore_last.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"unused_param_with_underscore_first.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["@typescript-eslint/explicit-function-return-type"]
	},
	"unused_param_with_underscore_last.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["@typescript-eslint/explicit-function-return-type"]
	},
	"unused_var_without_underscore.js": {
		expected: {
			legacy: ["no-unused-vars"],
			commonjs: ["no-unused-vars"],
			typescript: ["@typescript-eslint/no-unused-vars"]
		},
		ignored: ["strict", "no-var"]
	},
	"unused_var_with_underscore.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-var"]
	},

	"unused_rest_without_underscore.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: []
	},
	"unused_rest_with_underscore.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: []
	},

	"require_var.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-var"],
			typescript: ["no-var"]
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"require_destructure_var.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["no-var"],
			typescript: ["no-var"]
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"require_const.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"require_destructure_const.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["strict", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"require_import.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"require_destructure_import.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},

	"object_no_props.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_few_props_mixed_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_few_props_one_per_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_few_props_single_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_many_props_mixed_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_many_props_one_per_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_many_props_single_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "max-len", "@typescript-eslint/no-unused-vars"]
	},
	"object_props_numbers.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"function_param_per_line_with_space.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"function_param_per_line_without_space.js": {
		expected: {
			legacy: ["space-before-blocks"],
			commonjs: ["space-before-blocks"],
			typescript: ["space-before-blocks"]
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"function_param_single_line_with_space.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"function_param_single_line_without_space.js": {
		expected: {
			legacy: ["space-before-blocks"],
			commonjs: ["space-before-blocks"],
			typescript: ["space-before-blocks"]
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},

	"comment_eslint_line_before.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["fake", "no-undef", "no-warning-comments"]
	},
	"comment_eslint_line_end.js": {
		expected: {
			legacy: ["line-comment-position"],
			commonjs: ["line-comment-position"],
			typescript: ["line-comment-position"]
		},
		ignored: ["fake", "no-undef", "no-warning-comments"]
	},
	"comment_eslint_line_after.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["fake", "no-undef", "no-warning-comments"]
	},

	"comment_line_before.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-undef"]
	},
	"comment_line_end.js": {
		expected: {
			legacy: ["line-comment-position"],
			commonjs: ["line-comment-position"],
			typescript: ["line-comment-position"]
		},
		ignored: ["no-undef"]
	},
	"comment_line_after.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-undef"]
	},

	"comment_this_before.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-invalid-this", "no-undef"]
	},
	"comment_this_start.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-invalid-this", "no-undef"]
	},
	"comment_this_between.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-undef"]
	},
	"comment_this_end.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["block-spacing", "no-invalid-this", "no-undef"]
	},
	"comment_this_after.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-invalid-this", "no-undef"]
	},

	"if_space_before.js": {
		expected: {
			legacy: ["space-before-blocks"],
			commonjs: ["space-before-blocks"],
			typescript: ["space-before-blocks"]
		},
		ignored: ["no-undef"]
	},
	"if_space_after.js": {
		expected: {
			legacy: ["keyword-spacing"],
			commonjs: ["keyword-spacing"],
			typescript: ["@typescript-eslint/keyword-spacing"]
		},
		ignored: ["no-undef"]
	},
	"if_space_before_after.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-undef"]
	},
	"operator_start.js": {
		expected: {
			legacy: ["operator-linebreak"],
			commonjs: ["operator-linebreak"],
			typescript: ["operator-linebreak"]
		},
		ignored: ["no-undef"]
	},
	"operator_end.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-undef"]
	},

	"ts_type_single_line_commas_with_last.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style"]
		},
		ignored: ["@typescript-eslint/comma-spacing", "@typescript-eslint/no-unused-vars"]
	},
	"ts_type_single_line_commas_without_last.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style"]
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_type_single_line_semicolons_with_last.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style"]
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_type_single_line_semicolons_without_last.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"mixed_operators_mixed_precedence_with_parens.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-undef", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"mixed_operators_mixed_precedence_without_parens.js": {
		expected: {
			legacy: ["no-mixed-operators"],
			commonjs: ["no-mixed-operators"],
			typescript: ["no-mixed-operators"]
		},
		ignored: ["no-undef", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"mixed_operators_same_precedence_with_parens.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-undef", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"mixed_operators_same_precedence_without_parens.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-undef", "no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"disable_correct_rule_without_comment.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: []
	},
	"disable_correct_rule_with_comment.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: []
	},
	"disable_wrong_rule_without_comment.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			typescript: ["no-undef"]
		},
		ignored: []
	},
	"disable_wrong_rule_with_comment.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			typescript: ["no-undef"]
		},
		ignored: []
	},
	"disable_multiple_rule_without_comment.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: []
	},
	"disable_multiple_rule_with_comment.js": {
		expected: {
			legacy: [],
			commonjs: [],
			typescript: []
		},
		ignored: []
	},

	"function_returns_promise_without_async.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: [],
			typescript: ["@typescript-eslint/promise-function-async"]
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	},
	"function_returns_promise_with_async.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-function-return-type", "@typescript-eslint/no-unused-vars"]
	}
};

describe("Eslint", function () {
	before("Reset /tmp", async function () {
		await emptyDir(tmpFolder);
	});
	["legacy", "commonjs", "typescript"].forEach(configId => {
		it(configId, async function () {
			const options = {
				useEslintrc: false,
				baseConfig: require(`../packages/${configId}`)
			};
			if (configId === "typescript"){
				options.extensions = [".js", ".jsx", ".ts", ".tsx"];
			}
			const engine = new ESLint(options);

			for (const filename in fixtures){
				const source = readFileSync(join(fixturesFolder, filename), "utf8");
				const filepath = join(tmpFolder, filename);
				writeFileSync(filepath, source, "utf8");
				const results = await engine.lintFiles([filepath]);
				unlinkSync(filepath);

				const rules = {};
				const {expected, ignored} = fixtures[filename];
				results[0].messages.forEach(result => {
					if (result.fatal) {
						rules.fatal = result.message;
					} else {
						if (!ignored.includes(result.ruleId)) {
							rules[result.ruleId] = result.message;
						}
					}
				});
				deepStrictEqual(Object.keys(rules).sort(), expected[configId].sort(), filename);
			}
		});
	});
});
