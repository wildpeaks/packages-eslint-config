'use strict';

module.exports = {
	// ES5 only, no CommonJS, no ES Modules, No React, No Preact, No classes, No promises, No Async, etc...
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

	// ES2015, React + JSX
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

	// ES2015, Flow without React
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

	// ES2015, Flow + React + JSX
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
