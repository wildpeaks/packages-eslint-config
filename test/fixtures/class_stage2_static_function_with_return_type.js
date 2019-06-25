/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */
/* eslint-disable class-methods-use-this */

class MyClass {
	static staticProperty: number = 100;
	static staticFunction = function(): number {
		const myValue: number = 200;
		return MyClass.staticProperty + myValue;
	};
}
