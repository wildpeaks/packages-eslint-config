class MyClass {
	instanceProperty: number = 10;
	boundFunction = (): number => {
		const myValue: number = 20;
		return this.instanceProperty + myValue;
	};
}
