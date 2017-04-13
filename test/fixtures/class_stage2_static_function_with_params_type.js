/* @flow */
/* eslint-disable flowtype/require-return-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */
/* global console */

class MyClass {
	static staticFunction = function(param1: number = 100, param2: number): void {
		console.log(param1 + param2);
	};
}
