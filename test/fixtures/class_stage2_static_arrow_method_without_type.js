/* @flow */
/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

class MyClass {
	static staticProperty = 100;
	static staticFunction = () => {
		const myValue = 200;
		return MyClass.staticProperty + myValue;
	};
}
