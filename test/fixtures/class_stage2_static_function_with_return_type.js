/* @flow */
/* eslint-disable flowtype/require-variable-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

class MyClass {
	static staticProperty: number = 100;
	static staticFunction = function(): number {
		const myValue: number = 200;
		return MyClass.staticProperty + myValue;
	};
}