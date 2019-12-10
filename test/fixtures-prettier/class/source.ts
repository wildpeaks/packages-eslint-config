/* eslint-env node */
class MyClass1 {}

class MyClass2 {
	myproperty: string = 'hello';
	constructor(){console.log("Hello");}
	mymethod1():void{console.log(this.myproperty);}
	static mymethod2():void{console.log(typeof window);}
}

class MyClass3 {
	public myproperty: string = 'hello';
	public constructor (){
		console.log("Hello");
	}
	public mymethod1(): void{
		console.log(this.myproperty);
	}
	public	static  mymethod2() :  void {
		console.log(typeof window);
	}
}
