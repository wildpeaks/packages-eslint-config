/* @flow */
/* eslint-disable flowtype/require-return-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* global console */

class MyClass {
	static staticFunction = (param1 = 100, param2) => {
		console.log(param1 + param2);
	};
}
