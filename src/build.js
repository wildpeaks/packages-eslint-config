/* eslint-env node, mocha */
/* eslint-disable no-sync */
'use strict';
const fs = require('fs');
const path = require('path');
const configs = require('..');
const {version} = require('../package.json');


function getPackageJson(id, {name, stage2, react, flow}){
	const pkg = {
		name: `@wildpeaks/${id}`,
		version,
		description: `ESLint Config: ${name}`,
		main: 'settings.js',
		files: ['settings.js'],
		repository: 'https://github.com/wildpeaks/packages-eslint-config',
		keywords: ['wildpeaks', 'eslint'],
		author: 'Cecile Muller',
		license: 'MIT',
		bugs: {
			url: 'https://github.com/wildpeaks/packages-eslint-config/issues'
		},
		homepage: 'https://github.com/wildpeaks/packages-eslint-config#readme',
		dependencies: {},
		peerDependencies: {
			eslint: '>=4.1.1'
		}
	};
	if (react){
		pkg.dependencies['eslint-plugin-react'] = '7.1.0';
	}
	if (stage2 || flow){
		pkg.dependencies['babel-eslint'] = '7.2.3';
		pkg.dependencies['eslint-plugin-babel'] = '4.1.1';
	}
	if (flow){
		pkg.dependencies['eslint-plugin-flowtype'] = '2.34.1';
	}
	return pkg;
}


function getEslintSettings({commonjs, stage2, es2015, esmodules, react, flow}){
	const eslintSettings = {
		env: {
			node: false,
			browser: false,
			commonjs: Boolean(commonjs),
			es6: Boolean(es2015)
		},
		parserOptions: {
			ecmaVersion: es2015 ? 2017 : 5,
			ecmaFeatures: {
				arrowFunctions: Boolean(es2015),
				templateStrings: Boolean(es2015)
			}
		},
		plugins: [],
		rules: {
			'no-cond-assign': ['error', 'always'],
			'no-console': 'off',
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
			'no-extra-parens': 'off',

			// @warning Semicolons after a stage2 static function or arrow function trigger this rule by mistake,
			// so it has to be disabled when stage2 is allowed until it's fixed.
			'no-extra-semi': flow ? 'off' : 'warn',

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
			'valid-jsdoc': 'off',
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
			'default-case': 'off',
			'dot-location': ['error', 'property'],
			'dot-notation': ['error'],
			'eqeqeq': 'error',
			'guard-for-in': 'off',
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
			'no-implicit-globals': 'off',
			'no-implied-eval': 'error',
			'no-invalid-this': 'error',
			'no-iterator': 'error',
			'no-labels': 'error',
			'no-lone-blocks': 'error',
			'no-loop-func': 'error',
			'no-magic-numbers': 'off',
			'no-multi-spaces': 'error',
			'no-multi-str': 'error',
			'no-native-reassign': 'error',
			'no-new': 'error',
			'no-new-func': 'off',
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

			'init-declarations': 'off',
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

			'callback-return': 'off',
			'global-require': 'error',
			'handle-callback-err': 'warn',
			'no-mixed-requires': 'off',
			'no-new-require': 'error',
			'no-path-concat': 'error',
			'no-process-env': 'warn',
			'no-process-exit': 'error',
			'no-sync': 'error',

			'array-bracket-spacing': ['error', 'never'],
			'block-spacing': ['error', 'never'],
			'brace-style': [2, '1tbs', {allowSingleLine: false}],
			'camelcase': 'off',
			'comma-dangle': ['error', 'never'],
			'comma-spacing': ['error', {before: false, after: true}],
			'comma-style': ['error', 'last'],
			'computed-property-spacing': ['error', 'never'],
			'consistent-this': ['error', 'self'],
			'eol-last': ['error'],
			'func-names': 'off',
			'func-style': ['error', 'declaration', {allowArrowFunctions: true}],
			'id-length': 'off',
			'id-match': 'off',

			// @warning That rule has no option to fix the "break" indent :(
			// https://github.com/eslint/eslint/issues/1798#issuecomment-121328852
			'indent': ['error', 'tab', {SwitchCase: 1}],

			'jsx-quotes': ['error', 'prefer-double'],
			'key-spacing': ['error', {beforeColon: false, afterColon: true}],
			'linebreak-style': ['error', 'unix'],
			'lines-around-comment': 'off',
			'max-depth': ['error', {max: 8}],
			'max-len': [1, 120, 4, {ignoreComments: true, ignoreUrls: true}],
			'max-lines': [0],
			'max-nested-callbacks': ['error', 5],
			'max-params': ['error', 10],
			'max-statements': ['error', 100],
			'max-statements-per-line': ['error', {max: 1}],
			'new-cap': ['error', {newIsCap: true, capIsNew: true}],
			'new-parens': 'error',
			'newline-after-var': 'off',
			'newline-before-return': 'off',
			'newline-per-chained-call': ['error', {ignoreChainWithDepth: 3 }],
			'no-array-constructor': 'error',
			'no-bitwise': 'error',
			'no-continue': 'error',
			'no-inline-comments': 'off',
			'no-lonely-if': 'error',
			'no-mixed-operators': 'error',
			'no-mixed-spaces-and-tabs': 'error',
			'no-multiple-empty-lines': ['error', {max: 2, maxEOF: 1, maxBOF: 1}],
			'no-negated-condition': 'off',
			'no-nested-ternary': 'error',
			'no-new-object': 'error',
			'no-plusplus': 'off',
			'no-spaced-func': 'error',
			'no-ternary': 'off',
			'no-trailing-spaces': 'error',
			'no-underscore-dangle': 'error',
			'no-unneeded-ternary': 'error',
			'no-whitespace-before-property': 'error',
			'object-curly-newline': 'off',
			'object-curly-spacing': 'off',
			'object-property-newline': 'off',
			'one-var': ['error', 'never'],
			'one-var-declaration-per-line': ['error', 'always'],
			'operator-assignment': ['error', 'always'],
			'operator-linebreak': ['error', 'before'],
			'padded-blocks': ['error', 'never'],
			'quote-props': ['error', 'consistent-as-needed'],
			'quotes': [2, 'single', {allowTemplateLiterals: true}],
			'semi': ['error', 'always'],
			'semi-spacing': ['error', {before: false, after: true}],
			'sort-vars': 'off',
			'space-before-blocks': ['error', {
				functions: (flow ? 'always' : 'never'),
				keywords: 'never',
				classes: 'always'
			}],
			'space-before-function-paren': ['error', 'never'],
			'space-in-parens': ['error', 'never'],
			'space-infix-ops': 'error',
			'space-unary-ops': ['error', {words: true, nonwords: false}],
			'spaced-comment': 'off',
			'unicode-bom': 'error',
			'wrap-regex': 'off',

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
			'no-var': es2015 ? 'error' : 'off',
			'object-shorthand': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-const': ['error', {destructuring: 'all'}],
			'prefer-reflect': 'off',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			'require-yield': 'error',
			'rest-spread-spacing': ['error', 'never'],
			'sort-imports': 'off',
			'template-curly-spacing': ['error', 'never'],
			'yield-star-spacing': ['error', {before: false, after: true}]
		}
	};

	if (esmodules){
		eslintSettings.parserOptions.sourceType = 'module';
		eslintSettings.parserOptions.allowImportExportEverywhere = false;
	}

	if (stage2 || flow){
		eslintSettings.parser = 'babel-eslint';
		eslintSettings.plugins.push('babel');
		eslintSettings.rules['babel/new-cap'] = eslintSettings.rules['new-cap'];
		eslintSettings.rules['babel/object-curly-spacing'] = eslintSettings.rules['object-curly-spacing'];
		eslintSettings.rules['babel/no-invalid-this'] = eslintSettings.rules['no-invalid-this'];
		eslintSettings.rules['babel/semi'] = eslintSettings.rules.semi;
		eslintSettings.rules['new-cap'] = 'off';
		eslintSettings.rules['object-curly-spacing'] = 'off';
		eslintSettings.rules['no-invalid-this'] = 'off';
		eslintSettings.rules.semi = 'off';
	}

	if (react){
		eslintSettings.parserOptions.ecmaFeatures.jsx = true;
		eslintSettings.parserOptions.ecmaFeatures.experimentalObjectRestSpread = true;
		eslintSettings.plugins.push('react');
		eslintSettings.extends = ['plugin:react/recommended'];
		eslintSettings.rules['react/prop-types'] = flow ? 'off' : ['error', {ignore: ['children']}];
	}

	if (flow){
		eslintSettings.plugins.push('flowtype');
		eslintSettings.settings = {
			flowtype: {
				onlyFilesWithFlowAnnotation: true
			}
		};
		eslintSettings.rules['flowtype/boolean-style'] = ['error', 'boolean'];
		eslintSettings.rules['flowtype/define-flow-type'] = 'error';
		eslintSettings.rules['flowtype/delimiter-dangle'] = ['error', 'never'];
		eslintSettings.rules['flowtype/generic-spacing'] = ['error', 'never'];
		eslintSettings.rules['flowtype/no-dupe-keys'] = 'error';
		eslintSettings.rules['flowtype/no-primitive-constructor-types'] = 'error';
		eslintSettings.rules['flowtype/no-weak-types'] = ['warn', {
			any: false,
			Object: true,
			Function: true
		}];
		eslintSettings.rules['flowtype/object-type-delimiter'] = ['error', 'comma'];
		eslintSettings.rules['flowtype/require-parameter-type'] = ['error', {
			excludeParameterMatch: '^_',
			excludeArrowFunctions: 'expressionsOnly'
		}];
		eslintSettings.rules['flowtype/require-return-type'] = ['error', 'always', {
			excludeArrowFunctions: 'expressionsOnly',
			annotateUndefined: 'always'
		}];
		eslintSettings.rules['flowtype/require-variable-type'] = 'off';
		eslintSettings.rules['flowtype/require-valid-file-annotation'] = 'off';
		eslintSettings.rules['flowtype/semi'] = ['error', 'always'];
		eslintSettings.rules['flowtype/sort-keys'] = 'off';
		eslintSettings.rules['flowtype/space-after-type-colon'] = ['error', 'always'];
		eslintSettings.rules['flowtype/space-before-generic-bracket'] = ['error', 'never'];
		eslintSettings.rules['flowtype/space-before-type-colon'] = ['error', 'never'];
		eslintSettings.rules['flowtype/type-id-match'] = ['error', '^([A-Z][a-z0-9]+)+$'];
		eslintSettings.rules['flowtype/union-intersection-spacing'] = ['error', 'never'];
		eslintSettings.rules['flowtype/use-flow-type'] = 'error';
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

	if (commonjs){
		// @see https://github.com/eslint/eslint/issues/892
		// @see https://github.com/eslint/eslint/pull/6922
		// @see https://github.com/eslint/eslint/issues/7967
		eslintSettings.globals = ['module'];
	}
	return eslintSettings;
}


function getReadme(id, {name, commonjs, stage2, es2015, esmodules, react, flow}){
	return `# ESLint Config: ${name}

Generated using the following [settings](https://github.com/wildpeaks/packages-eslint-config#readme):

- \`commonjs\`: ${commonjs ? 'true' : 'false'}
- \`stage2\`: ${stage2 ? 'true' : 'false'}
- \`es2015\`: ${es2015 ? 'true' : 'false'}
- \`esmodules\`: ${esmodules ? 'true' : 'false'}
- \`react\`: ${react ? 'true' : 'false'}
- \`flow\`: ${flow ? 'true' : 'false'}
	`;
}


function build(id){
	const config = configs[id];
	const folder = path.join(__dirname, '../packages', id);
	fs.mkdirSync(folder);
	fs.writeFileSync(
		path.join(folder, 'package.json'),
		JSON.stringify(getPackageJson(id, config)),
		'utf8'
	);
	fs.writeFileSync(
		path.join(folder, 'settings.js'),
		'module.exports = ' + JSON.stringify(getEslintSettings(config)) + ';', // eslint-disable-line prefer-template
		'utf8'
	);
	fs.writeFileSync(
		path.join(folder, 'README.md'),
		getReadme(id, config),
		'utf8'
	);
}


fs.mkdirSync(path.join(__dirname, '../packages'));
describe('Packages', () => {
	for (const id in configs){
		it(id, build.bind(null, id));
	}
});

