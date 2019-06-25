class MyClass {
	instanceProperty: number = 10;
	boundFunction = function(): number {
		const myValue: number = 20;
		return this.instanceProperty + myValue;
	};
}
