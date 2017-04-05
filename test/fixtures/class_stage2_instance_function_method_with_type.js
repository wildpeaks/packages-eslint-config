/* @flow */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

class MyClass {
	instanceProperty: number = 10;
	boundFunction = function(): number {
		const myValue: number = 20;
		return this.instanceProperty + myValue;
	};
}
