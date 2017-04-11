/* @flow */
/* eslint-disable flowtype/require-return-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* global console */

class MyClass {
	static staticFunction = (_param1: number = 100, _param2: number): void => {
		console.log(_param1 + _param2);
	};
}
