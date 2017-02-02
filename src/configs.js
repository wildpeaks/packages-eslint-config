'use strict';

module.exports = {
	'eslint-config-legacy': {
		name: 'ES5 Legacy'
	},

	'eslint-config-commonjs': {
		name: 'ES2015, CommonJS',
		es2015: true,
		commonjs: true
	},
	'eslint-config-esmodules': {
		name: 'ES2015, ES Modules',
		es2015: true,
		esmodules: true
	},

	'eslint-config-commonjs-react': {
		name: 'ES2015, CommonJS, React, JSX',
		es2015: true,
		commonjs: true,
		react: true
	},
	'eslint-config-esmodules-react': {
		name: 'ES2015, ES Modules, React, JSX',
		es2015: true,
		esmodules: true,
		react: true
	},

	'eslint-config-commonjs-flow': {
		name: 'ES2015, CommonJS, Flow',
		es2015: true,
		commonjs: true,
		flow: true
	},
	'eslint-config-esmodules-flow': {
		name: 'ES2015, ES Modules, Flow',
		es2015: true,
		esmodules: true,
		flow: true
	},

	'eslint-config-commonjs-react-flow': {
		name: 'ES2015, CommonJS, React, JSX, Flow',
		es2015: true,
		commonjs: true,
		react: true,
		flow: true
	},
	'eslint-config-esmodules-react-flow': {
		name: 'ES2015, ES Modules, React, JSX, Flow',
		es2015: true,
		esmodules: true,
		react: true,
		flow: true
	}
};
