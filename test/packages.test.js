/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
"use strict";
const {strictEqual} = require("assert");
const {existsSync, readFileSync} = require("fs");
const {join} = require("path");
const packagesFolder = join(process.cwd(), "packages");

function runTest(id) {
	it(id, function () {
		const folder = join(packagesFolder, id);
		strictEqual(existsSync(folder), true, "Folder exists");

		let throws = false;
		let packageJson;
		try {
			packageJson = JSON.parse(readFileSync(join(folder, "package.json"), "utf8"));
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, false, "package.json can be read");
		strictEqual(typeof packageJson, "object", "package is an Object");
		if (id === "prettier") {
			strictEqual(packageJson.name, `@wildpeaks/prettier-config`, "package.name");
		} else {
			strictEqual(packageJson.name, `@wildpeaks/eslint-config-${id}`, "package.name");
		}
		strictEqual(packageJson.main, "index.js", "package.main");

		throws = false;
		try {
			readFileSync(join(folder, "index.js"), "utf8");
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, false, "index.js can be read");

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
			settings = require(`../packages/${id}`);
		} catch (e) {
			throws = true;
		}
		strictEqual(throws, false, "Package can be required");
		strictEqual(typeof settings, "object", "Package exports an Object");
		if (id === "prettier") {
			strictEqual(typeof settings.useTabs, "boolean", "Package contains useTabs");
		} else {
			strictEqual(typeof settings.rules, "object", "Package contains rules");
		}
	});
}

describe("require()", function () {
	runTest("legacy");
	runTest("commonjs");
	runTest("typescript");
	runTest("esmodules");
	runTest("prettier");
});
