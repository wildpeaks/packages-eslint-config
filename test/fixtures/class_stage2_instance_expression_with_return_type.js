/* @flow */
/* eslint-disable flowtype/require-variable-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

class MyClass {
	instanceProperty: number = 10;
	boundFunction = (): number => this.instanceProperty + 1;
}
