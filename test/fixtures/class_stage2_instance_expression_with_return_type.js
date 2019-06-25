class MyClass {
	instanceProperty: number = 10;
	boundFunction = (): number => this.instanceProperty + 1;
}
