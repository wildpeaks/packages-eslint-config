/* eslint-env node, mocha */
"use strict";
const fs = require("fs");
const path = require("path");
const configs = require("..");
const {version, dependencies} = require("../package.json");

function getPackageJson(configId, {description, typescript}) {
	const pkg = {
		name: `@wildpeaks/eslint-config-${configId}`,
		version,
		description: `ESLint Config: ${description}`,
		main: "settings.js",
		files: ["settings.js"],
		repository: "https://github.com/wildpeaks/packages-eslint-config",
		keywords: ["wildpeaks", "eslint"],
		author: "Cecile Muller",
		license: "MIT",
		bugs: {
			url: "https://github.com/wildpeaks/packages-eslint-config/issues"
		},
		homepage: "https://github.com/wildpeaks/packages-eslint-config#readme",
		dependencies: {}
	};
	if (typescript) {
		for (const packageId of ["typescript", "@typescript-eslint/eslint-plugin", "@typescript-eslint/parser"]) {
			pkg.dependencies[packageId] = dependencies[packageId];
		}
	}
	return pkg;
}

function getEslintSettings({commonjs, es2017, esmodules, typescript}) {
	const eslintSettings = {
		env: {
			node: false,
			browser: false,
			commonjs: Boolean(commonjs),
			es6: Boolean(es2017)
		},
		parserOptions: {
			ecmaVersion: es2017 ? 2017 : 5,
			ecmaFeatures: {
				arrowFunctions: Boolean(es2017),
				templateStrings: Boolean(es2017)
			}
		},
		plugins: [],

		// @see https://eslint.org/docs/rules/
		rules: {
			"for-direction": "error",
			"getter-return": "error",
			"no-await-in-loop": es2017 ? "error" : "off",
			"no-compare-neg-zero": "error",
			"no-cond-assign": ["error", "always"],
			"no-console": "off",
			"no-constant-condition": "error",
			"no-control-regex": "error",
			"no-debugger": "error",
			"no-dupe-args": "error",
			"no-dupe-keys": "error",
			"no-duplicate-case": "error",
			"no-empty": "error",
			"no-empty-character-class": "error",
			"no-ex-assign": "error",
			"no-extra-boolean-cast": "error",
			"no-extra-parens": "off",
			"no-extra-semi": "warn",
			"no-func-assign": "error",
			"no-inner-declarations": "error",
			"no-invalid-regexp": "error",
			"no-irregular-whitespace": [
				"error",
				{
					skipStrings: true,
					skipComments: true,
					skipRegExps: true,
					skipTemplates: true
				}
			],
			"no-obj-calls": "error",
			"no-prototype-builtins": "error",
			"no-regex-spaces": "warn",
			"no-sparse-arrays": "error",
			"no-template-curly-in-string": es2017 ? "error" : "off",
			"no-unexpected-multiline": "error",
			"no-unreachable": "error",
			"no-unsafe-finally": "error",
			"no-unsafe-negation": "error",
			"use-isnan": "error",
			"valid-jsdoc": "off",
			"valid-typeof": "error",

			"accessor-pairs": [
				"error",
				{
					setWithoutGet: true,
					getWithoutSet: false
				}
			],
			"array-callback-return": "error",
			"block-scoped-var": "error",
			"class-methods-use-this": es2017 ? "error" : "off",
			complexity: "off",
			"consistent-return": "error",
			curly: "error",
			"default-case": "off",
			"dot-location": ["error", "property"],
			"dot-notation": ["error"],
			eqeqeq: "error",
			"guard-for-in": "off",
			"no-alert": "error",
			"no-caller": "error",
			"no-case-declarations": "error",
			"no-div-regex": "error",
			"no-else-return": "error",
			"no-empty-function": "warn",
			"no-empty-pattern": "error",
			"no-eq-null": "error",
			"no-eval": "error",
			"no-extend-native": "error",
			"no-extra-bind": "error",
			"no-extra-label": "off",
			"no-fallthrough": "error",
			"no-floating-decimal": "error",
			"no-global-assign": "error",
			"no-implicit-coercion": "error",
			"no-implicit-globals": "off",
			"no-implied-eval": "error",
			"no-invalid-this": "error",
			"no-iterator": "error",
			"no-labels": "error",
			"no-lone-blocks": "error",
			"no-loop-func": "error",
			"no-magic-numbers": "off",
			"no-multi-spaces": "error",
			"no-multi-str": "error",
			"no-new": "error",
			"no-new-func": "off",
			"no-new-wrappers": "error",
			"no-octal": "error",
			"no-octal-escape": "error",
			"no-param-reassign": "error",
			"no-proto": "error",
			"no-redeclare": "error",
			"no-restricted-properties": "off",
			"no-return-assign": "error",
			"no-return-await": es2017 ? "error" : "off",
			"no-script-url": "error",
			"no-self-assign": "error",
			"no-self-compare": "error",
			"no-sequences": "error",
			"no-throw-literal": "error",
			"no-unmodified-loop-condition": "error",
			"no-unused-expressions": "warn",
			"no-unused-labels": "off",
			"no-useless-call": "warn",
			"no-useless-concat": "error",
			"no-useless-escape": "warn",
			"no-useless-return": "error",
			"no-void": "error",
			"no-warning-comments": [
				"warn",
				{
					terms: ["todo", "todelete", "uncomment", "eslint-disable-line"],
					location: "anywhere"
				}
			],
			"no-with": "error",
			"prefer-promise-reject-errors": "off",
			radix: "error",
			"require-await": es2017 ? "error" : "off",
			"vars-on-top": es2017 ? "off" : "error",
			"wrap-iife": ["error", "any"],
			yoda: ["error", "never"],

			strict: [2, "global"],

			"init-declarations": "off",
			"no-catch-shadow": "error",
			"no-delete-var": "error",
			"no-label-var": "off",
			"no-restricted-globals": "off",
			"no-shadow": [
				"error",
				{
					builtinGlobals: true,
					hoist: "all"
				}
			],
			"no-shadow-restricted-names": "error",
			"no-undef": "error",
			"no-undef-init": "error",
			"no-undefined": "off",
			"no-unused-vars": [
				"error",
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_"
				}
			],
			"no-use-before-define": [
				"error",
				{
					functions: false,
					classes: true
				}
			],

			"callback-return": "off",
			"global-require": "error",
			"handle-callback-err": "warn",
			"no-buffer-constructor": "error",
			"no-mixed-requires": "off",
			"no-new-require": "error",
			"no-path-concat": "error",
			"no-process-env": "warn",
			"no-process-exit": "error",
			"no-restricted-modules": "off",
			"no-sync": "error",

			"array-bracket-newline": ["error", "consistent"],
			"array-bracket-spacing": ["error", "never"],
			"array-element-newline": "off",
			"block-spacing": ["error", "never"],
			"brace-style": [2, "1tbs", {allowSingleLine: false}],
			camelcase: "off",
			"capitalized-comments": "off",
			"comma-dangle": ["error", "never"],
			"comma-spacing": ["error", {before: false, after: true}],
			"comma-style": ["error", "last"],
			"computed-property-spacing": ["error", "never"],
			"consistent-this": ["error", "self"],
			"eol-last": ["error"],
			"func-call-spacing": ["error", "never"],
			"func-name-matching": "off",
			"func-names": "off",
			"func-style": ["error", "declaration", {allowArrowFunctions: true}],
			"function-paren-newline": ["error", "consistent"],
			"id-blacklist": "off",
			"id-length": "off",
			"id-match": "off",

			// @warning That rule has no option to align "break" with "case" :(
			// https://github.com/eslint/eslint/issues/1798#issuecomment-121328852
			indent: ["error", "tab", {SwitchCase: 1, MemberExpression: "off"}],

			"jsx-quotes": ["error", "prefer-double"],
			"key-spacing": ["error", {beforeColon: false, afterColon: true}],
			"line-comment-position": ["error", {position: "above", applyDefaultIgnorePatterns: false}],
			"keyword-spacing": ["error", {before: true, after: true}],
			"linebreak-style": ["error", "unix"],
			"lines-around-comment": "off",
			"lines-between-class-members": "off",
			"max-depth": ["error", {max: 8}],
			"max-len": [1, 180, 4, {ignoreComments: true, ignoreUrls: true}],
			"max-lines": [0],
			"max-nested-callbacks": ["error", 5],
			"max-params": ["error", 10],
			"max-statements": ["error", 100],
			"max-statements-per-line": ["error", {max: 1}],
			"multiline-comment-style": "off",
			"multiline-ternary": ["error", "never"],
			"new-cap": ["error", {newIsCap: true, capIsNew: true}],
			"new-parens": "error",
			"newline-per-chained-call": ["error", {ignoreChainWithDepth: 5}],
			"no-array-constructor": "error",
			"no-bitwise": "error",
			"no-continue": "error",
			"no-inline-comments": "off",
			"no-lonely-if": "error",
			"no-mixed-operators": ["error", {"allowSamePrecedence": true}],
			"no-mixed-spaces-and-tabs": "error",
			"no-multi-assign": "error",
			"no-multiple-empty-lines": ["error", {max: 2, maxEOF: 1, maxBOF: 1}],
			"no-negated-condition": "off",
			"no-nested-ternary": "error",
			"no-new-object": "error",
			"no-plusplus": "off",
			// no-restricted-syntax is defined later
			"no-tabs": "off",
			"no-ternary": "off",
			"no-trailing-spaces": "error",
			"no-underscore-dangle": "off",
			"no-unneeded-ternary": "error",
			"no-whitespace-before-property": "error",
			"nonblock-statement-body-position": "off",
			"object-curly-newline": "off",
			"object-curly-spacing": "off",
			"object-property-newline": "off",
			"one-var": ["error", "never"],
			"one-var-declaration-per-line": ["error", "always"],
			"operator-assignment": ["error", "always"],
			"operator-linebreak": ["error", "after"],
			"padded-blocks": "off", // Not specific enough: I'd want 0 or 1 at the beginning, 0 at the end, 1 or 2 before multiline comments
			"padding-line-between-statements": "off",
			"quote-props": ["error", "as-needed"], // I'd want to require quotes around numbers, but Prettier has no option for it
			quotes: [2, "double", {avoidEscape: true, allowTemplateLiterals: true}],
			"require-jsdoc": "off",
			semi: ["error", "always"],
			"semi-spacing": ["error", {before: false, after: true}],
			"semi-style": ["error", "last"],
			"sort-keys": "off",
			"sort-vars": "off",
			"space-before-blocks": ["error", "always"],
			"space-before-function-paren": ["error", {
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}],
			"space-in-parens": ["error", "never"],
			"space-infix-ops": "error",
			"space-unary-ops": ["error", {words: true, nonwords: false}],
			"spaced-comment": "off",
			"switch-colon-spacing": "error",
			"template-tag-spacing": es2017 ? ["error", "always"] : "off",
			"unicode-bom": "error",
			"wrap-regex": "off",

			"arrow-body-style": es2017 ? ["error", "as-needed"] : "off",
			"arrow-parens": es2017 ? ["error", "as-needed"] : "off",
			"arrow-spacing": es2017 ? ["error", {before: true, after: true}] : "off",
			"constructor-super": es2017 ? "error" : "off",
			"generator-star-spacing": es2017 ? ["error", {before: false, after: true}] : "off",
			"no-class-assign": es2017 ? "error" : "off",
			"no-confusing-arrow": es2017 ? "error" : "off",
			"no-const-assign": es2017 ? "error" : "off",
			"no-dupe-class-members": es2017 ? "error" : "off",
			"no-duplicate-imports": es2017 && esmodules ? "error" : "off",
			"no-new-symbol": es2017 ? "error" : "off",
			"no-restricted-imports": "off",
			"no-this-before-super": es2017 ? "error" : "off",
			"no-useless-computed-key": "error",
			"no-useless-constructor": es2017 ? "error" : "off",
			"no-useless-rename": es2017 ? "error" : "off",
			"no-var": es2017 ? "error" : "off",
			"object-shorthand": es2017 ? "error" : "off",
			"prefer-arrow-callback": es2017 ? "error" : "off",
			"prefer-const": ["error", {destructuring: "all"}],
			"prefer-destructuring": es2017 ? ["error", {array: false, object: true}] : "off",
			"prefer-numeric-literals": es2017 ? "error" : "off",
			"prefer-rest-params": es2017 ? "error" : "off",
			"prefer-spread": "error",
			"prefer-template": "off",
			"require-yield": es2017 ? "error" : "off",
			"rest-spread-spacing": ["error", "never"],
			"sort-imports": "off",
			"symbol-description": "error",
			"template-curly-spacing": es2017 ? ["error", "never"] : "off",
			"yield-star-spacing": ["error", {before: false, after: true}]
		}
	};

	if (typescript) {
		// Core rules that have a better Typescript-AST-compatible version
		[
			"func-call-spacing",
			"indent",
			"no-unused-vars",
			"no-empty-function",
			"no-extra-parens",
			"no-use-before-define",
			"no-useless-constructor",
			"semi"
		].forEach(ruleId => {
			eslintSettings.rules[`@typescript-eslint/${ruleId}`] = eslintSettings.rules[ruleId];
			eslintSettings.rules[ruleId] = "off";
		});

		eslintSettings.rules["@typescript-eslint/await-thenable"] = "error";
		eslintSettings.rules["@typescript-eslint/explicit-function-return-type"] = [
			"error",
			{
				allowExpressions: true,
				allowHigherOrderFunctions: true,
				allowTypedFunctionExpressions: true
			}
		];
		eslintSettings.rules["@typescript-eslint/explicit-member-accessibility"] = [
			"error",
			{
				accessibility: "explicit"
			}
		];
		eslintSettings.rules["@typescript-eslint/member-delimiter-style"] = [
			"error",
			{
				multiline: {
					delimiter: "semi",
					requireLast: true
				},
				singleline: {
					delimiter: "semi",
					requireLast: false
				}
			}
		];
		eslintSettings.rules["@typescript-eslint/no-empty-interface"] = [
			"error",
			{
				allowSingleExtends: false
			}
		];
		eslintSettings.rules["@typescript-eslint/no-floating-promises"] = "error";
		eslintSettings.rules["@typescript-eslint/no-for-in-array"] = "error";
		eslintSettings.rules["@typescript-eslint/no-misused-new"] = "error";
		eslintSettings.rules["@typescript-eslint/no-parameter-properties"] = ["error", {allows: ["readonly"]}];
		eslintSettings.rules["@typescript-eslint/no-this-alias"] = [
			"error",
			{
				allowedNames: ["self"],
				allowDestructuring: true
			}
		];
		eslintSettings.rules["@typescript-eslint/prefer-includes"] = "warn";
		eslintSettings.rules["@typescript-eslint/prefer-regexp-exec"] = "error";
		eslintSettings.rules["@typescript-eslint/prefer-string-starts-ends-with"] = "error";
		eslintSettings.rules["@typescript-eslint/restrict-plus-operands"] = "off";

		eslintSettings.rules["@typescript-eslint/adjacent-overload-signatures"] = "off";
		eslintSettings.rules["@typescript-eslint/array-type"] = "off";
		eslintSettings.rules["@typescript-eslint/ban-ts-ignore"] = "off";
		eslintSettings.rules["@typescript-eslint/ban-types"] = "off";
		eslintSettings.rules["@typescript-eslint/camelcase"] = "off";
		eslintSettings.rules["@typescript-eslint/class-name-casing"] = "off";
		eslintSettings.rules["@typescript-eslint/consistent-type-definitions"] = "off";
		eslintSettings.rules["@typescript-eslint/generic-type-naming"] = "off";
		eslintSettings.rules["@typescript-eslint/interface-name-prefix"] = "off";
		eslintSettings.rules["@typescript-eslint/member-naming"] = "off";
		eslintSettings.rules["@typescript-eslint/member-ordering"] = "off";
		eslintSettings.rules["@typescript-eslint/no-array-constructor"] = "off";
		eslintSettings.rules["@typescript-eslint/no-explicit-any"] = "off";
		eslintSettings.rules["@typescript-eslint/no-extra-parens"] = "off";
		eslintSettings.rules["@typescript-eslint/no-extraneous-class"] = "off";
		eslintSettings.rules["@typescript-eslint/no-inferrable-types"] = "off";
		eslintSettings.rules["@typescript-eslint/no-magic-numbers"] = "off";
		eslintSettings.rules["@typescript-eslint/no-namespace"] = "off";
		eslintSettings.rules["@typescript-eslint/no-non-null-assertion"] = "off";
		eslintSettings.rules["@typescript-eslint/no-object-literal-type-assertion"] = "off";
		eslintSettings.rules["@typescript-eslint/no-require-imports"] = "off";
		eslintSettings.rules["@typescript-eslint/no-triple-slash-reference"] = "off";
		eslintSettings.rules["@typescript-eslint/no-type-alias"] = "off";
		eslintSettings.rules["@typescript-eslint/no-unnecessary-qualifier"] = "off";
		eslintSettings.rules["@typescript-eslint/no-unnecessary-type-assertion"] = "off";
		eslintSettings.rules["@typescript-eslint/no-var-requires"] = "off";
		eslintSettings.rules["@typescript-eslint/prefer-for-of"] = "off";
		eslintSettings.rules["@typescript-eslint/prefer-function-type"] = "off";
		eslintSettings.rules["@typescript-eslint/prefer-namespace-keyword"] = "off";
		eslintSettings.rules["@typescript-eslint/require-array-sort-compare"] = "off";
		eslintSettings.rules["@typescript-eslint/unbound-method"] = "off";
		eslintSettings.rules["@typescript-eslint/unified-signatures"] = "off";

		// The rule ignores "tsconfig.alwaysStrict"
		eslintSettings.rules.strict = "off";
		eslintSettings.parserOptions.ecmaFeatures.impliedStrict = true;

		// Typescript parser & rules
		eslintSettings.parser = "@typescript-eslint/parser";
		eslintSettings.plugins.push("@typescript-eslint");
		eslintSettings.parserOptions.project = "./tsconfig.json";
	}

	if (esmodules) {
		eslintSettings.parserOptions.sourceType = "module";
		eslintSettings.parserOptions.allowImportExportEverywhere = false;
		eslintSettings.rules["no-restricted-syntax"] = ["error", "WithStatement"];
	} else {
		eslintSettings.rules["no-restricted-syntax"] = [
			"error",
			"WithStatement",
			"ImportDeclaration",
			"ImportSpecifier",
			"ImportDefaultSpecifier",
			"ImportNamespaceSpecifier",
			"ExportDefaultDeclaration",
			"ExportNamedDeclaration",
			"ExportAllDeclaration",
			"ExportSpecifier"
		];
	}

	if (commonjs) {
		eslintSettings.globals = {
			module: true
		};
	}
	return eslintSettings;
}

function getReadme({description, commonjs, es2017, esmodules, typescript}) {
	return `# ESLint Config: ${description}

Generated using the following [settings](https://github.com/wildpeaks/packages-eslint-config#readme):

- \`commonjs\`: ${commonjs ? "true" : "false"}
- \`esmodules\`: ${esmodules ? "true" : "false"}
- \`es2017\`: ${es2017 ? "true" : "false"}
- \`typescript\`: ${typescript ? "true" : "false"}
	`;
}

function build(configId) {
	const config = configs[configId];
	const folder = path.join(__dirname, "../packages", configId);
	fs.mkdirSync(folder);
	fs.writeFileSync(path.join(folder, "package.json"), JSON.stringify(getPackageJson(configId, config)), "utf8");
	fs.writeFileSync(
		path.join(folder, "settings.js"),
		"module.exports = " + JSON.stringify(getEslintSettings(config)) + ";",
		"utf8"
	);
	fs.writeFileSync(path.join(folder, "README.md"), getReadme(config), "utf8");
}

fs.mkdirSync(path.join(__dirname, "../packages"));
describe("Build", () => {
	for (const configId in configs) {
		it(configId, build.bind(null, configId));
	}
});
