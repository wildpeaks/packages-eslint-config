class MyClass {
	instanceProperty = 10;
	boundFunction = () => {
		const myValue = 20;
		return this.instanceProperty + myValue;
	};
}
