/* @flow */
/* eslint-disable flowtype/require-return-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */
/* global console */
/* eslint-disable class-methods-use-this */

class MyClass {
	static staticFunction = (_param1: number = 100, _param2: number): void => {
		console.log(_param1 + _param2);
	};
}
