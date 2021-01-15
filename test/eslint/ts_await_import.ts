/* global console */
async function _example(): Promise<void> {
	const fake = await import("./fake");
	console.log(fake);
}
