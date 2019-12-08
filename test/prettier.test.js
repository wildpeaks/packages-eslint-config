"use strict";
const {readFileSync} = require("fs");
const {strictEqual, deepStrictEqual} = require("assert");
const {join} = require("path");
const {CLIEngine} = require("eslint");
const {format} = require("prettier");
const configs = require("..");
const pkg = require("../package.json");


const fixturesFolder = join(__dirname, "fixtures-prettier");
const fixtures = {
	"import-from-few": {
		ext: "ts",
		ignore: ["no-unused-vars"],
		compatible: ["esmodules", "typescript"]
	},
	"import-from-many": {
		ext: "ts",
		ignore: ["no-unused-vars"],
		compatible: ["esmodules", "typescript", "commonjs"]
	}
};

const engines = {};
for (const configId in configs) {
	const settings = require(`../packages/${configId}`); // eslint-disable-line global-require
	settings.useEslintrc = false;
	// settings.extensions = ['.js', '.jsx', '.ts', '.tsx']; // not needed because I only use "execute on text" in theory
	if (typeof settings.globals === "object") {
		settings.globals = Object.keys(settings.globals);
	}
	engines[configId] = new CLIEngine(settings);
}

function runTest(fixtureId) {
	const {ext, ignore, compatible} = fixtures[fixtureId];

	const source = readFileSync(join(fixturesFolder, `${fixtureId}/source.${ext}`), "utf8");
	const expected = readFileSync(join(fixturesFolder, `${fixtureId}/expected.${ext}`), "utf8");
	const actual = format(source, Object.assign({filepath: `source.${ext}`}, pkg.prettier));
	strictEqual(actual, expected, "Prettify");

	for (const configId of compatible) {
		const engine = engines[configId];
		const report = engine.executeOnText(actual, 'whatever.js');

		const result = report.results[0];
		const rules = {};
		result.messages.forEach(message => {
			if (message.fatal){
				rules.fatal = message.message;
			} else {
				if (!ignore.includes(message.ruleId)){
					rules[message.ruleId] = message.message;
				}
			}
		});
		deepStrictEqual(rules, {}, 'Eslint rules');
	}
}

describe("Prettier", function() {
	this.slow(8000);
	this.timeout(10000);
	for (const fixtureId in fixtures) {
		it(fixtureId, runTest.bind(this, fixtureId));
	}
});
