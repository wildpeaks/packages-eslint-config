/* @flow */
/* eslint-disable flowtype/require-return-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* global console */

class MyClass {
	boundFunction = (param1: number = 100, param2: number): void => {
		console.log(param1 + param2);
	};
}
