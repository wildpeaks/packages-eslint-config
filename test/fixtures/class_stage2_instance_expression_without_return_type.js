/* @flow */
/* eslint-disable flowtype/require-variable-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */

class MyClass {
	instanceProperty = 10;
	boundFunction = () => this.instanceProperty + 1;
}
