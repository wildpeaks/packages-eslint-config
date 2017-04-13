/* @flow */
/* eslint-disable flowtype/require-return-type */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable space-before-blocks */
/* global console */

class MyClass {
	boundFunction = function(param1 = 100, param2){
		console.log(param1 + param2);
	};
}
