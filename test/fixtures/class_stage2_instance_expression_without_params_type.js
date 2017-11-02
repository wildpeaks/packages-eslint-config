/* @flow */
/* eslint-disable flowtype/require-return-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */
/* global console */
/* eslint-disable class-methods-use-this */

class MyClass {
	boundFunction = (param1 = 100, param2) => console.log(param1 + param2);
}
