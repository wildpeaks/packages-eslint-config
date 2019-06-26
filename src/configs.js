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
	'eslint-config-typescript': {
		name: 'ES2017, ES Modules, Typescript',
		es2017: true,
		commonjs: true,
		esmodules: true,
		typescript: true
	}
};
