/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
"use strict";
const {join} = require("path");
const {emptyDir} = require("fs-extra");
const {writeFileSync, readFileSync} = require("fs");
const pkg = require("../package.json");

const [,,,,,,,param7, param8] = process.argv;
const version = (param7 === "--version") ? param8 : "0.0.0";

function writeReadme({name, folder}) {
	const data = readFileSync(join(__dirname, "template.prettier.md"), "utf8").replace(/%%name%%/g, name);
	writeFileSync(join(folder, "README.md"), data, "utf8");
}
function writePackage({name, folder}) {
	const data = {
		name,
		version,
		description: "Prettier settings",
		main: "index.js",
		files: ["index.js"],
		repository: "https://github.com/wildpeaks/packages-eslint-config",
		keywords: ["wildpeaks", "prettier", "prettierconfig"],
		author: "Cecile Muller",
		license: "MIT",
		bugs: {
			url: "https://github.com/wildpeaks/packages-eslint-config/issues"
		},
		homepage: "https://github.com/wildpeaks/packages-eslint-config#readme"
	};
	writeFileSync(join(folder, "package.json"), JSON.stringify(data), "utf8");
}
function writeExports({folder}) {
	const raw = `module.exports = ${JSON.stringify(pkg.prettier)};`;
	writeFileSync(join(folder, "index.js"), raw, "utf8");
}

describe("Prettier", function () {
	const name = `@wildpeaks/prettier-config`;
	const folder = join(process.cwd(), "packages/prettier");
	before(async function () {
		await emptyDir(folder);
	});
	it("README.md", function () {
		writeReadme({name, folder});
	});
	it("package.json", function () {
		writePackage({name, folder});
	});
	it("index.js", function () {
		writeExports({folder});
	});
});
