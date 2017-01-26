/* eslint-env node, mocha */
/* eslint quote-props: ["error", "consistent-as-needed"] */
'use strict';
const configs = require('.');


function getEslintSettings({es2015, commonjs, esmodules, react, flow}){
	const eslintSettings = {
		env: {
			node: false,
			browser: false,
			commonjs,
			es6: es2015 || esmodules
		},
		rules: {
			'no-cond-assign': ['error', 'always'],
			'no-console': 0,
			'no-constant-condition': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-dupe-args': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-empty': 'error',
			'no-empty-character-class': 'error',
			'no-ex-assign': 'error',
			'no-extra-boolean-cast': 'error',
			'no-extra-parens': 0,
			'no-extra-semi': 'warn',
			'no-func-assign': 'error',
			'no-inner-declarations': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': [
				'error',
				{
					skipStrings: true,
					skipComments: true,
					skipRegExps: true,
					skipTemplates: true
				}
			],
			'no-negated-in-lhs': 'error',
			'no-obj-calls': 'error',
			'no-prototype-builtins': 'error',
			'no-regex-spaces': 'warn',
			'no-sparse-arrays': 'error',
			'no-unexpected-multiline': 'error',
			'no-unreachable': 'error',
			'no-unsafe-finally': 'error',
			'use-isnan': 'error',
			'valid-jsdoc': 0,
			'valid-typeof': 'error',

			'accessor-pairs': [
				'error',
				{
					setWithoutGet: true,
					getWithoutSet: false
				}
			],
			'array-callback-return': 'error',
			'block-scoped-var': 'error',
			'consistent-return': 'error',
			'curly': 'error',
			'default-case': 0,
			'dot-location': ['error', 'property'],
			'dot-notation': ['error'],
			'eqeqeq': 'error',
			'guard-for-in': 0,
			'no-alert': 'error',
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-div-regex': 'error',
			'no-else-return': 'error',
			'no-empty-function': 'warn',
			'no-empty-pattern': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-fallthrough': 'error',
			'no-floating-decimal': 'error',
			'no-implicit-coercion': 'error',
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			'no-invalid-this': 'error',
			'no-iterator': 'error',
			'no-labels': 'error',
			'no-lone-blocks': 'error',
			'no-loop-func': 'error',
			'no-magic-numbers': 0,
			'no-multi-spaces': 'error',
			'no-multi-str': 'error',
			'no-native-reassign': 'error',
			'no-new': 'error',
			'no-new-func': 0,
			'no-new-wrappers': 'error',
			'no-octal': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': 'error',
			'no-proto': 'error',
			'no-redeclare': 'error',
			'no-return-assign': 'error',
			'no-script-url': 'error',
			'no-self-assign': 'error',
			'no-self-compare': 'error',
			'no-sequences': 'error',
			'no-throw-literal': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unused-expressions': 'warn',
			'no-useless-call': 'warn',
			'no-useless-concat': 'error',
			'no-useless-escape': 'warn',
			'no-void': 'error',
			'no-warning-comments': ['warn', {
				terms: ['todo', 'todelete', 'uncomment'],
				location: 'anywhere'
			}],
			'no-with': 'error',
			'radix': 'error',
			'vars-on-top': 'error',
			'wrap-iife': ['error', 'any'],
			'yoda': ['error', 'never'],

			'strict': [2, 'global'],

			'init-declarations': 0,
			'no-catch-shadow': 'error',
			'no-delete-var': 'error',
			'no-shadow': ['error', {
				builtinGlobals: true,
				hoist: 'all'
			}],
			'no-shadow-restricted-names': 'error',
			'no-undef': 'error',
			'no-undef-init': 'error',
			'no-undefined': 'error',
			'no-unused-vars': 'error',
			'no-use-before-define': ['error', {
				functions: false,
				classes: true
			}],

			'callback-return': 0,
			'global-require': 'error',
			'handle-callback-err': 'warn',
			'no-mixed-requires': 0,
			'no-new-require': 'error',
			'no-path-concat': 'error',
			'no-process-env': 'warn',
			'no-process-exit': 'error',
			'no-sync': 'error',

			'array-bracket-spacing': ['error', 'never'],
			'block-spacing': ['error', 'never'],
			'brace-style': [2, '1tbs', {allowSingleLine: false}],
			'camelcase': 0,
			'comma-dangle': ['error', 'never'],
			'comma-spacing': ['error', {before: false, after: true}],
			'comma-style': ['error', 'last'],
			'computed-property-spacing': ['error', 'never'],
			'consistent-this': ['error', 'self'],
			'eol-last': ['error'],
			'func-names': 0,
			'func-style': ['error', 'declaration', {allowArrowFunctions: true}],
			'id-length': 0,
			'id-match': 0,

			// @warning That rule has no option to fix the "break" indent :(
			// https://github.com/eslint/eslint/issues/1798#issuecomment-121328852
			'indent': ['error', 'tab', {SwitchCase: 1}],

			'jsx-quotes': ['error', 'prefer-double'],
			'key-spacing': ['error', {beforeColon: false, afterColon: true}],
			'linebreak-style': ['error', 'unix'],
			'lines-around-comment': 0,
			'max-depth': ['error', {max: 8}],
			'max-len': [1, 120, 4, {ignoreComments: true, ignoreUrls: true}],
			'max-lines': [0],
			'max-nested-callbacks': ['error', 5],
			'max-params': ['error', 10],
			'max-statements': ['error', 100],
			'max-statements-per-line': ['error', {max: 1}],
			'new-cap': ['error', {newIsCap: true, capIsNew: true}],
			'new-parens': 'error',
			'newline-after-var': 0,
			'newline-before-return': 0,
			'newline-per-chained-call': ['error', {ignoreChainWithDepth: 3 }],
			'no-array-constructor': 'error',
			'no-bitwise': 'error',
			'no-continue': 'error',
			'no-inline-comments': 0,
			'no-lonely-if': 'error',
			'no-mixed-operators': 'error',
			'no-mixed-spaces-and-tabs': 'error',
			'no-multiple-empty-lines': ['error', {max: 2, maxEOF: 1, maxBOF: 1}],
			'no-negated-condition': 0,
			'no-nested-ternary': 'error',
			'no-new-object': 'error',
			'no-plusplus': 0,
			'no-spaced-func': 'error',
			'no-ternary': 0,
			'no-trailing-spaces': 'error',
			'no-underscore-dangle': 'error',
			'no-unneeded-ternary': 'error',
			'no-whitespace-before-property': 'error',
			'object-curly-newline': 0,
			'object-curly-spacing': 0,
			'object-property-newline': 0,
			'one-var': ['error', 'never'],
			'one-var-declaration-per-line': ['error', 'always'],
			'operator-assignment': ['error', 'always'],
			'operator-linebreak': ['error', 'before'],
			'padded-blocks': ['error', 'never'],
			'quote-props': ['error', 'as-needed'],
			'quotes': [2, 'single', {allowTemplateLiterals: true}],
			'semi': ['error', 'always'],
			'semi-spacing': ['error', {before: false, after: true}],
			'sort-vars': 0,
			'space-before-blocks': ['error', {
				functions: (flow ? 'always' : 'never'),
				keywords: 'never',
				classes: 'always'
			}],
			'space-before-function-paren': ['error', 'never'],
			'space-in-parens': ['error', 'never'],
			'space-infix-ops': 'error',
			'space-unary-ops': ['error', {words: true, nonwords: false}],
			'spaced-comment': 0,
			'unicode-bom': 'error',
			'wrap-regex': 0,

			'arrow-body-style': ['error', 'as-needed'],
			'arrow-parens': ['error', (flow ? 'always' : 'as-needed')],
			'arrow-spacing': ['error', {before: true, after: true}],
			'constructor-super': 'error',
			'generator-star-spacing': ['error', {before: false, after: true}],
			'no-class-assign': 'error',
			'no-confusing-arrow': 'error',
			'no-const-assign': 'error',
			'no-dupe-class-members': 'error',
			'no-duplicate-imports': 'error',
			'no-new-symbol': 'error',
			'no-this-before-super': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-constructor': 'error',
			'no-useless-rename': 'error',
			'no-var': 'error',
			'object-shorthand': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-const': ['error', {destructuring: 'all'}],
			'prefer-reflect': 0,
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			'require-yield': 'error',
			'rest-spread-spacing': ['error', 'never'],
			'sort-imports': 0,
			'template-curly-spacing': ['error', 'never'],
			'yield-star-spacing': ['error', {before: false, after: true}]
		}
	};
	if (es2015 || esmodules){
		eslintSettings.parserOptions = {
			ecmaVersion: 2015,
			ecmaFeatures: {
				arrowFunctions: true,
				templateStrings: true
			}
		};
		if (esmodules){
			eslintSettings.parserOptions.sourceType = 'module';
			eslintSettings.parserOptions.allowImportExportEverywhere = false;
		}
		if (react){
			eslintSettings.parserOptions.ecmaFeatures.jsx = true;
			eslintSettings.parserOptions.ecmaFeatures.experimentalObjectRestSpread = true;
		}
	}
	if (react || flow){
		eslintSettings.plugins = [];
	}
	if (react){
		eslintSettings.plugins.push('react');
		eslintSettings.extends = ['plugin:react/recommended'];
		eslintSettings.rules['react/prop-types'] = ['error', {ignore: ['children']}];
	}
	if (flow){
		eslintSettings.parser = 'babel-eslint';
		eslintSettings.plugins.push('flowtype');
		eslintSettings.settings = {
			flowtype: {
				onlyFilesWithFlowAnnotation: true
			}
		};
		eslintSettings.rules['flowtype/define-flow-type'] = 1;
		eslintSettings.rules['flowtype/require-parameter-type'] = 1;
		eslintSettings.rules['flowtype/require-return-type'] = ['error', 'always', {
			excludeArrowFunctions: true,
			annotateUndefined: 'always'
		}];
		eslintSettings.rules['flowtype/space-after-type-colon'] = [1, 'always'];
		eslintSettings.rules['flowtype/space-before-type-colon'] = [1, 'never'];
		eslintSettings.rules['flowtype/type-id-match'] = [1, '^([A-Z][a-z0-9]+)+Type$'];
		eslintSettings.rules['flowtype/use-flow-type'] = 1;
		eslintSettings.rules['flowtype/valid-syntax'] = 1;
	}
	if (esmodules){
		eslintSettings.rules['no-restricted-syntax'] = ['error', 'WithStatement'];
	} else {
		eslintSettings.rules['no-restricted-syntax'] = [
			'error',
			'WithStatement',
			'ImportDeclaration', 'ImportSpecifier', 'ImportDefaultSpecifier', 'ImportNamespaceSpecifier',
			'ExportDefaultDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration', 'ExportSpecifier'
		];
	}
	return eslintSettings;
}


function getPackageJson(id, version, {name, react, flow}){
	const pkg = {
		version,
		name: `ESLint Config: ${name}`,
		main: 'settings.js',
		files: ['settings.js'],
		peerDependencies: {
			eslint: '>=3.14.1'
		}
	};
	if (react || flow){
		pkg.dependencies = {};
	}
	if (react){
		pkg.dependencies['eslint-plugin-react'] = '6.9.0';
	}
	if (flow){
		pkg.dependencies['babel-eslint'] = '7.1.1';
		pkg.dependencies['eslint-plugin-flowtype'] = '2.30.0';
	}
	return pkg;
}


function getReadme(id, {name}){
	return `ESLint Config: ${name}\n\n (${id}\n\nSee AAAAAAAAAAAAAAAAAAAAAAAA`;
}


describe('Packages', () => {
	let version = '1.0.0';
	before(() => {
		//
		// TODO read the version number
		//
		version = '2.0.0';
	});
	for (const id in configs){
		it(id, () => {
			const config = configs[id];
			const eslintSettings = getEslintSettings(config);
			// const packageJson = getPackageJson(id, version, config);
			// const markdown = getReadme(id, config);

			//
			// TODO Create /packages/:id folder
			//
			// TODO Write settings.js
			//
			// TODO Write README.md
			//
		});
	}
});

