/* @flow */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

class MyClass {
	instanceProperty = 10;
	boundFunction = function() {
		const myValue = 20;
		return this.instanceProperty + myValue;
	};
}
