/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */
/* eslint-disable class-methods-use-this */

class MyClass {
	static staticProperty = 100;
	static staticFunction = () => {
		const myValue = 200;
		return MyClass.staticProperty + myValue;
	};
}
