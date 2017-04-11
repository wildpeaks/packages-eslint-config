/* @flow */
/* eslint-disable flowtype/require-variable-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

class MyClass {
	instanceProperty = 10;
	boundFunction = () => {
		const myValue = 20;
		return this.instanceProperty + myValue;
	};
}
