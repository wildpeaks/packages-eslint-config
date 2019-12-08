/* eslint-env node, mocha */
"use strict";
const {strictEqual} = require("assert");
const {existsSync, readFileSync} = require("fs");
const {join} = require("path");
const configs = require("..");
const {version} = require("../package.json");
const packagesFolder = join(__dirname, "../packages");

function runTest(configId) {
	const folder = join(packagesFolder, configId);
	strictEqual(existsSync(folder), true, "Folder exists");

	let throws = false;
	let packageJson;
	try {
		packageJson = JSON.parse(readFileSync(join(folder, "package.json"), "utf8"));
	} catch (e) {
		throws = true;
	}
	strictEqual(throws, false, "package.json can be read");
	strictEqual(typeof packageJson, "object", "packageJson is a JSON Object");
	strictEqual(packageJson.name, `@wildpeaks/eslint-config-${configId}`, "package.name");
	strictEqual(packageJson.main, "settings.js", "package.main");
	strictEqual(packageJson.version, version, "package.version");

	throws = false;
	try {
		readFileSync(join(folder, "settings.js"), "utf8");
	} catch (e) {
		throws = true;
	}
	strictEqual(throws, false, "settings.js can be read");

	throws = false;
	try {
		readFileSync(join(folder, "README.md"), "utf8");
	} catch (e) {
		throws = true;
	}
	strictEqual(throws, false, "README.md can be read");

	throws = false;
	let settings;
	try {
		settings = require(`../packages/${configId}`); // eslint-disable-line global-require
	} catch (e) {
		throws = true;
	}
	strictEqual(throws, false, "Package can be required");
	strictEqual(typeof settings, "object", "Package exports an Object");
}

describe("Lint", function() {
	for (const configId in configs) {
		it(configId, runTest.bind(this, configId));
	}
});
