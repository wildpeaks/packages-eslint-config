class MyClass {
	static staticProperty: number = 100;
	static staticFunction = (): number => {
		const myValue: number = 200;
		return MyClass.staticProperty + myValue;
	};
}
