class MyClass {
	instanceProperty = 10;
	boundFunction = function() {
		const myValue = 20;
		return this.instanceProperty + myValue;
	};
}
