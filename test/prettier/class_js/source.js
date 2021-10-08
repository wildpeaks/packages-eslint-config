/* eslint-env node */
class MyClass1 {}

class MyClass2 {
	constructor(){console.log("Hello");}
	mymethod1(){console.log(this.myproperty);}
	static mymethod2(){console.log(typeof window);}
}

class MyClass3 {
	 constructor (){
		console.log("Hello");
	}
	 mymethod1(){
		console.log(this.myproperty);
	}
		static  mymethod2()  {
		console.log(typeof window);
	}
}
