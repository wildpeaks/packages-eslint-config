'use strict';

module.exports = {
	'eslint-config-legacy': {
		name: 'ES5 Legacy'
	},

	'eslint-config-commonjs': {
		name: 'ES2017, CommonJS',
		es2017: true,
		commonjs: true
	},
	'eslint-config-esmodules': {
		name: 'ES2017, ES Modules',
		es2017: true,
		esmodules: true
	},

	'eslint-config-commonjs-stage2': {
		name: 'ES2017, CommonJS',
		stage2: true,
		es2017: true,
		commonjs: true
	},
	'eslint-config-esmodules-stage2': {
		name: 'ES2017, ES Modules',
		stage2: true,
		es2017: true,
		esmodules: true
	},

	'eslint-config-commonjs-react': {
		name: 'ES2017, CommonJS, React, JSX',
		es2017: true,
		commonjs: true,
		react: true
	},
	'eslint-config-esmodules-react': {
		name: 'ES2017, ES Modules, React, JSX',
		es2017: true,
		esmodules: true,
		react: true
	},

	'eslint-config-commonjs-react-stage2': {
		name: 'ES2017, CommonJS, React, JSX',
		stage2: true,
		es2017: true,
		commonjs: true,
		react: true
	},
	'eslint-config-esmodules-react-stage2': {
		name: 'ES2017, ES Modules, React, JSX',
		stage2: true,
		es2017: true,
		esmodules: true,
		react: true
	},
	'eslint-config-typescript': {
		name: 'ES2017, ES Modules, Typescript',
		es2017: true,
		commonjs: true,
		esmodules: true,
		typescript: true
	}
};
