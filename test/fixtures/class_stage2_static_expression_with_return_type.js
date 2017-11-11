/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */
/* eslint-disable class-methods-use-this */

class MyClass {
	static staticProperty: number = 100;
	static staticFunction = (): number => MyClass.staticProperty + 1;
}
