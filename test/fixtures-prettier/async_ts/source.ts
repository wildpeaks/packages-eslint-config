/* global console */
/* eslint-env mocha */
const myfunction1 = async () => {
	console.log("Hello");
};
const myfunction2 = async()=>{console.log("Hello")};
const myfunction3 = async()=>console.log("Hello");
const myfunction4 = async (myparam: string) => {
	console.log(myparam);
};
const myfunction5 = async (myparam: string) => {console.log(myparam);};
const myfunction6 = async (myparam: string) => console.log(myparam);

it("Example", async () => {
	console.log("Hello");
});
it("Example", async () => console.log("Hello"));
it("Example", async()=>console.log("Hello"));

it("Example", async (myparam: string) => {
	console.log(myparam);
});
it("Example", async (myparam: string) => console.log(myparam));
it("Example", async(myparam: string) => console.log(myparam));
