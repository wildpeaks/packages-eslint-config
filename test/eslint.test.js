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
	"strict_without.js": {
		expected: {
			legacy: ["strict"],
			commonjs: ["strict"],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"strict_with.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"var.js": {
		expected: {
			legacy: [],
			commonjs: ["no-var"],
			esmodules: ["no-var"],
			typescript: ["no-var"]
		},
		ignored: []
	},

	"arrow_function_single_param_without_parens.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["arrow-parens"],
			esmodules: ["arrow-parens"],
			typescript: ["arrow-parens"]
		},
		ignored: []
	},
	"arrow_function_single_param_with_parens.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"arrow_function_multiple_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"class_empty.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"class_stage0_function_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility"]
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},

	"class_stage2_instance_property_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_property_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},

	"class_stage2_instance_function_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_function_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_instance_arrow_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_arrow_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_instance_expression_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_expression_without_return_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},

	"class_stage2_instance_function_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["class-methods-use-this"],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars", "class-methods-use-this"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_function_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_instance_arrow_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["class-methods-use-this"],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars", "class-methods-use-this"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_arrow_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_instance_expression_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["class-methods-use-this"],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars", "class-methods-use-this"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_expression_without_params_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},

	"class_stage2_instance_function_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["class-methods-use-this"],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars", "class-methods-use-this"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_function_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_instance_arrow_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["class-methods-use-this"],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars", "class-methods-use-this"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_arrow_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_instance_expression_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["class-methods-use-this"],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars", "class-methods-use-this"]
		},
		ignored: ["no-unused-vars"]
	},
	"class_stage2_static_expression_underscore_params_without_type.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: ["@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-unused-vars"]
	},

	"line_80.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"line_120.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"line_150.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"line_240.js": {
		expected: {
			legacy: ["max-len"],
			commonjs: ["max-len"],
			esmodules: ["max-len"],
			typescript: ["max-len"]
		},
		ignored: []
	},

	"without_env_node.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			esmodules: ["no-undef"],
			typescript: []
		},
		ignored: []
	},
	"with_env_node.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"without_env_browser.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			esmodules: ["no-undef"],
			typescript: []
		},
		ignored: []
	},
	"with_env_browser.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"without_env_mocha.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			esmodules: ["no-undef"],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"with_env_mocha.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"promise.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"jsx_without_require.jsx": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"tsx_without_import.tsx": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: []
	},

	"await_toplevel.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"await_in_loop.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},

	"async_function.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"async_arrow_without_space.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["space-before-function-paren"],
			esmodules: ["space-before-function-paren"],
			typescript: ["@typescript-eslint/space-before-function-paren"]
		},
		ignored: []
	},
	"async_arrow_with_space.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"quotes_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			esmodules: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_backtick.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"quotes_property_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			esmodules: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_backtick.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},

	"quotes_property_inconsistent_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			esmodules: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_consistent_single.js": {
		expected: {
			legacy: ["quotes", "quote-props"],
			commonjs: ["quotes", "quote-props"],
			esmodules: ["quotes", "quote-props"],
			typescript: ["@typescript-eslint/quotes", "quote-props"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_inconsistent_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_consistent_double.js": {
		expected: {
			legacy: ["quote-props"],
			commonjs: ["quote-props"],
			esmodules: ["quote-props"],
			typescript: ["quote-props"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"quotes_property_mixed_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			esmodules: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_property_mixed_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"quotes_concatenate_number_number.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_number_string_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			esmodules: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_number_string_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_number_string_backtick.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_string_string_single.js": {
		expected: {
			legacy: ["quotes"],
			commonjs: ["quotes"],
			esmodules: ["quotes"],
			typescript: ["@typescript-eslint/quotes"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_string_string_double.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"quotes_concatenate_string_string_backtick.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"chained_two_methods_single_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"chained_two_methods_multiple_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"chained_four_methods_single_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"chained_four_methods_multiple_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"chained_six_methods_single_line.js": {
		expected: {
			legacy: ["newline-per-chained-call"],
			commonjs: ["newline-per-chained-call"],
			esmodules: ["newline-per-chained-call"],
			typescript: ["newline-per-chained-call"]
		},
		ignored: []
	},
	"chained_six_methods_multiple_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"this_root.js": {
		expected: {
			legacy: [],
			commonjs: ["no-invalid-this"],
			esmodules: ["no-invalid-this"],
			typescript: []
		},
		ignored: []
	},
	"this_function.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"this_arrow.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["no-invalid-this"],
			esmodules: ["no-invalid-this"],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"this_class_constructor.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"this_class_method.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"this_class_static.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},

	"padding_class_beginning_zero_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_beginning_one_line.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_beginning_two_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_end_zero_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_end_one_line.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_end_two_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},

	"padding_class_method_beginning_zero_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_beginning_one_line.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_beginning_two_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_end_zero_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_end_one_line.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},
	"padding_class_method_end_two_lines.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["class-methods-use-this", "no-unused-vars", "@typescript-eslint/explicit-member-accessibility", "@typescript-eslint/no-unused-vars"]
	},

	"padding_function_beginning_zero_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_beginning_one_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_beginning_two_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_end_zero_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_end_one_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"padding_function_end_two_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},

	"ternary.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"ts_enum_commas.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_enum_semicolons.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},

	"ts_type_union_level0_short.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_type_union_level1_short.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_type_union_level0_long.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_type_union_level1_long.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: [
				// Known issue with long unions:
				// https://github.com/typescript-eslint/typescript-eslint/issues/1824
				"@typescript-eslint/indent"
			]
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"ts_type_commas.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style", "@typescript-eslint/no-unused-vars"]
		},
		ignored: []
	},
	"ts_type_semicolons.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"ts_interface_commas.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style"]
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_interface_semicolons.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"ts_generic.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_optional_parameter.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_jsdoc.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"destructuring_declare_object_param_dot.js": {
		expected: {
			legacy: [],
			commonjs: ["prefer-destructuring"],
			esmodules: ["prefer-destructuring"],
			typescript: ["prefer-destructuring"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_object_param_dot.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_object_param_bracket.js": {
		expected: {
			legacy: [],
			commonjs: ["prefer-destructuring"],
			esmodules: ["prefer-destructuring"],
			typescript: ["prefer-destructuring"]
		},
		ignored: ["no-unused-vars", "no-var", "dot-notation", "@typescript-eslint/dot-notation", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_object_param_bracket.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "dot-notation", "@typescript-eslint/dot-notation", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_object_param_destructured.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_object_param_destructured.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_array_value_index.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_array_value_index.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_array_destructured_first.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_array_destructured_first.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_declare_array_destructured_second.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"destructuring_assign_array_destructured_second.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"unused_param_without_underscore_first.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"unused_param_without_underscore_last.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"unused_param_with_underscore_first.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"unused_param_with_underscore_last.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"unused_var_without_underscore.js": {
		expected: {
			legacy: ["no-unused-vars"],
			commonjs: ["no-unused-vars"],
			esmodules: ["no-unused-vars"],
			typescript: ["@typescript-eslint/no-unused-vars"]
		},
		ignored: ["no-var"]
	},
	"unused_var_with_underscore.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-var"]
	},

	"unused_rest_without_underscore.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"unused_rest_with_underscore.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"module_exports.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"require_var.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-var"],
			esmodules: ["no-undef", "no-var"],
			typescript: ["no-var"]
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"require_destructure_var.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["no-var"],
			esmodules: ["no-undef", "no-var"],
			typescript: ["no-var"]
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"require_const.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: ["no-undef"],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"require_destructure_const.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: ["no-undef"],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},

	"await_import.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},

	"ts_await_import.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"ts_import_require.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"ts_import_require_destructure.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},
	"ts_import_type_default.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"ts_import_type_destructure.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"ts_export_var.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["no-var"],
			typescript: ["no-var"]
		},
		ignored: []
	},
	"ts_export_const.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"ts_export_arrow.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},
	"ts_export_function.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"ts_export_default_var.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["no-var"],
			typescript: ["no-var"]
		},
		ignored: []
	},
	"ts_export_default_const.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["fatal"]
		},
		ignored: []
	},
	"ts_export_default_arrow.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["arrow-body-style"]
	},
	"ts_export_default_function.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: []
	},
	"ts_export_default_number.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"object_no_props.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_few_props_mixed_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_few_props_one_per_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_few_props_single_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_many_props_mixed_lines.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_many_props_one_per_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"object_many_props_single_line.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "max-len", "@typescript-eslint/no-unused-vars"]
	},
	"object_props_numbers.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"function_param_per_line_with_space.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"function_param_per_line_without_space.js": {
		expected: {
			legacy: ["space-before-blocks"],
			commonjs: ["space-before-blocks"],
			esmodules: ["space-before-blocks"],
			typescript: ["space-before-blocks"]
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"function_param_single_line_with_space.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"function_param_single_line_without_space.js": {
		expected: {
			legacy: ["space-before-blocks"],
			commonjs: ["space-before-blocks"],
			esmodules: ["space-before-blocks"],
			typescript: ["space-before-blocks"]
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},

	"comment_eslint_line_before.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["fake", "no-warning-comments"]
	},
	"comment_eslint_line_end.js": {
		expected: {
			legacy: ["line-comment-position"],
			commonjs: ["line-comment-position"],
			esmodules: ["line-comment-position"],
			typescript: ["line-comment-position"]
		},
		ignored: ["fake", "no-warning-comments"]
	},
	"comment_eslint_line_after.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["fake", "no-warning-comments"]
	},

	"comment_line_before.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"comment_line_end.js": {
		expected: {
			legacy: ["line-comment-position"],
			commonjs: ["line-comment-position"],
			esmodules: ["line-comment-position"],
			typescript: ["line-comment-position"]
		},
		ignored: []
	},
	"comment_line_after.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"comment_this_before.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-invalid-this"]
	},
	"comment_this_start.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-invalid-this"]
	},
	"comment_this_between.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"comment_this_end.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["block-spacing", "no-invalid-this"]
	},
	"comment_this_after.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-invalid-this"]
	},

	"if_space_before.js": {
		expected: {
			legacy: ["space-before-blocks"],
			commonjs: ["space-before-blocks"],
			esmodules: ["space-before-blocks"],
			typescript: ["space-before-blocks"]
		},
		ignored: []
	},
	"if_space_after.js": {
		expected: {
			legacy: ["keyword-spacing"],
			commonjs: ["keyword-spacing"],
			esmodules: ["keyword-spacing"],
			typescript: ["@typescript-eslint/keyword-spacing"]
		},
		ignored: []
	},
	"if_space_before_after.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"operator_start.js": {
		expected: {
			legacy: ["operator-linebreak"],
			commonjs: ["operator-linebreak"],
			esmodules: ["operator-linebreak"],
			typescript: ["operator-linebreak"]
		},
		ignored: []
	},
	"operator_end.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"ts_type_single_line_commas_with_last.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style"]
		},
		ignored: ["@typescript-eslint/comma-spacing", "@typescript-eslint/no-unused-vars"]
	},
	"ts_type_single_line_commas_without_last.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style"]
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_type_single_line_semicolons_with_last.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: ["@typescript-eslint/member-delimiter-style"]
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},
	"ts_type_single_line_semicolons_without_last.ts": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["fatal"],
			esmodules: ["fatal"],
			typescript: []
		},
		ignored: ["@typescript-eslint/no-unused-vars"]
	},

	"mixed_operators_mixed_precedence_with_parens.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"mixed_operators_mixed_precedence_without_parens.js": {
		expected: {
			legacy: ["no-mixed-operators"],
			commonjs: ["no-mixed-operators"],
			esmodules: ["no-mixed-operators"],
			typescript: ["no-mixed-operators"]
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"mixed_operators_same_precedence_with_parens.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},
	"mixed_operators_same_precedence_without_parens.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "no-var", "@typescript-eslint/no-unused-vars"]
	},

	"disable_correct_rule_without_comment.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"disable_correct_rule_with_comment.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"disable_wrong_rule_without_comment.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			esmodules: ["no-undef"],
			typescript: []
		},
		ignored: []
	},
	"disable_wrong_rule_with_comment.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: ["no-undef"],
			esmodules: ["no-undef"],
			typescript: []
		},
		ignored: []
	},
	"disable_multiple_rule_without_comment.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},
	"disable_multiple_rule_with_comment.js": {
		expected: {
			legacy: [],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: []
	},

	"function_returns_promise_without_async.js": {
		expected: {
			legacy: ["no-undef"],
			commonjs: [],
			esmodules: [],
			typescript: ["@typescript-eslint/promise-function-async"]
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},
	"function_returns_promise_with_async.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-unused-vars", "@typescript-eslint/no-unused-vars"]
	},

	"tag_with_space.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: ["template-tag-spacing"],
			esmodules: ["template-tag-spacing"],
			typescript: ["template-tag-spacing"]
		},
		ignored: ["no-undef"]
	},
	"tag_without_space.js": {
		expected: {
			legacy: ["fatal"],
			commonjs: [],
			esmodules: [],
			typescript: []
		},
		ignored: ["no-undef"]
	}
};

describe("Eslint", function () {
	before("Reset /tmp", async function () {
		await emptyDir(tmpFolder);
	});
	["legacy", "commonjs", "typescript", "esmodules"].forEach(configId => {
		it(configId, async function () {
			const options = {
				useEslintrc: false,
				baseConfig: require(`../packages/${configId}`)
			};
			if (configId === "typescript"){
				options.extensions = [".js", ".jsx", ".ts", ".tsx"];
			} else if (configId === "esmodules"){
				options.extensions = [".js", ".mjs"];
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
