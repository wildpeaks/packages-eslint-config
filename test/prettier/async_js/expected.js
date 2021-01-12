/* global console */
/* global fake */
"use strict";

const myfunction1 = async () => {
	console.log("Hello");
};
const myfunction2 = async () => {
	console.log("Hello");
};
const myfunction3 = async () => console.log("Hello");
const myfunction4 = async (myparam) => {
	console.log(myparam);
};
const myfunction5 = async (myparam) => {
	console.log(myparam);
};
const myfunction6 = async (myparam) => console.log(myparam);

const myfunction7 = async (myparam) => {
	console.log(myparam);
};
const myfunction8 = async (myparam) => {
	console.log(myparam);
};
const myfunction9 = async (myparam) => console.log(myparam);

fake("Example", async () => {
	console.log("Hello");
});
fake("Example", async () => console.log("Hello"));
fake("Example", async () => console.log("Hello"));

fake("Example", async (myparam) => {
	console.log(myparam);
});
fake("Example", async (myparam) => console.log(myparam));
fake("Example", async (myparam) => console.log(myparam));

fake("Example", async (myparam) => {
	console.log(myparam);
});
fake("Example", async (myparam) => console.log(myparam));
fake("Example", async (myparam) => console.log(myparam));
