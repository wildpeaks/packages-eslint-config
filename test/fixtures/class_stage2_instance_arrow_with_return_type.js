/* @flow */
/* eslint-disable flowtype/require-variable-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */
/* eslint-disable class-methods-use-this */

class MyClass {
	instanceProperty: number = 10;
	boundFunction = (): number => {
		const myValue: number = 20;
		return this.instanceProperty + myValue;
	};
}
