"use strict";
const {readFileSync, writeFileSync, unlinkSync, mkdirSync} = require("fs");
const {strictEqual, deepStrictEqual} = require("assert");
const {join} = require("path");
const {CLIEngine} = require("eslint");
const {format} = require("prettier");
const configs = require("..");
const pkg = require("../package.json");

const tmpFolder = join(__dirname, "tmp");
const fixturesFolder = join(__dirname, "fixtures-prettier");
const fixtures = {
	"import": {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	"typed_function": {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	"untyped_function": {
		ext: "js",
		ignore: ["no-unused-vars"],
		compatible: ["commonjs", "legacy"]
	},
	"require": {
		ext: "js",
		ignore: ["no-unused-vars"],
		compatible: ["commonjs"]
	},
	"object_props": {
		ext: "js",
		ignore: ['no-var', 'no-unused-vars', '@typescript-eslint/no-unused-vars'],
		compatible: ["commonjs", "legacy", "typescript"]
	}
};

const engines = {};
for (const configId in configs) {
	const settings = require(`../packages/${configId}`); // eslint-disable-line global-require
	settings.useEslintrc = false;
	settings.extensions = [".js", ".jsx", ".ts", ".tsx"];
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

		//
		// TODO check files before
		//
		const filepath = join(tmpFolder, `fake.${ext}`);
		writeFileSync(filepath, actual, 'utf8');
		const report = engine.executeOnFiles([tmpFolder]);
		unlinkSync(filepath);
		//
		// TODO check files after
		//

		const result = report.results[0];
		const rules = {};
		result.messages.forEach(message => {
			if (message.fatal) {
				rules.fatal = message.message;
			} else {
				if (!ignore.includes(message.ruleId)) {
					rules[message.ruleId] = message.message;
				}
			}
		});
		deepStrictEqual(rules, {}, "Eslint rules");
	}
}

before('Before', function(){
	try{
		mkdirSync(tmpFolder);
	} catch(e){}
});
describe("Prettier", function() {
	this.slow(8000);
	this.timeout(10000);
	for (const fixtureId in fixtures) {
		it(fixtureId, runTest.bind(this, fixtureId));
	}
});
