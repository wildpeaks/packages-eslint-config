/* eslint-disable no-implicit-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-blocks */
/* eslint-disable strict */
/* eslint-disable class-methods-use-this */

class MyClass {
	instanceProperty = 10;
	boundFunction = () => {
		const myValue = 20;
		return this.instanceProperty + myValue;
	};
}
