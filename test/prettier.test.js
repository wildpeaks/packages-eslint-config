/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
"use strict";
const {strictEqual, deepStrictEqual} = require("assert");
const {readFileSync, writeFileSync, unlinkSync} = require("fs");
const {emptyDir} = require("fs-extra");
const {join} = require("path");
const {ESLint} = require("eslint");
const {format} = require("prettier");
const pkg = require("../package.json");

const tmpFolder = join(process.cwd(), "tmp");
const fixturesFolder = join(__dirname, "prettier");
const fixtures = {
	import: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	export_1: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	export_2: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	export_3: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	export_4: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	export_5: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	export_6: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	require: {
		ext: "js",
		ignore: ["no-unused-vars"],
		compatible: ["commonjs"]
	},
	condition: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars", "no-constant-condition", "no-undef"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	function_variable: {
		ext: "js",
		ignore: [
			"no-var",
			"no-unused-vars",
			"@typescript-eslint/no-unused-vars",
			"func-style",
			"no-empty-function",
			"@typescript-eslint/explicit-function-return-type",
			"@typescript-eslint/no-empty-function"
		],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	function_untyped: {
		ext: "js",
		ignore: ["no-unused-vars"],
		compatible: ["commonjs", "legacy"]
	},
	function_typed: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars"],
		compatible: ["typescript"]
	},
	class: {
		ext: "ts",
		ignore: ["@typescript-eslint/no-unused-vars", "@typescript-eslint/explicit-member-accessibility"],
		compatible: ["typescript"]
	},
	prop_newlines: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	prop_quotes_1: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	prop_quotes_2: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	prop_quotes_3: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	prop_quotes_4: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	prop_quotes_5: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	prop_quotes_6: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	prop_quotes_7: {
		ext: "js",
		ignore: ["no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	},
	async_js: {
		ext: "js",
		ignore: [
			"require-await",
			"no-var",
			"no-unused-vars",
			"@typescript-eslint/no-unused-vars",
			"@typescript-eslint/explicit-function-return-type"
		],
		compatible: ["commonjs", "typescript"]
	},
	async_ts: {
		ext: "ts",
		ignore: [
			"require-await",
			"@typescript-eslint/no-unused-vars",
			"@typescript-eslint/explicit-function-return-type"
		],
		compatible: ["typescript"]
	},
	operator_wrapping: {
		ext: "js",
		ignore: ["no-undef"],
		compatible: ["legacy", "commonjs", "typescript"]
	},

	// Prettier triggers "no-mixed-operators" when it mixes precedences levels unfortunately:
	// https://github.com/wildpeaks/packages-eslint-config/issues/35#issuecomment-567107215
	mixed_operators: {
		ext: "js",
		ignore: ["no-mixed-operators", "no-undef", "no-var", "no-unused-vars", "@typescript-eslint/no-unused-vars"],
		compatible: ["legacy", "commonjs", "typescript"]
	}
};

describe("Prettier", function () {
	before("Reset /tmp", async function () {
		await emptyDir(tmpFolder);
	});
	["legacy", "commonjs", "typescript"].forEach(configId => {
		it(configId, async function () {
			const options = {
				useEslintrc: false,
				baseConfig: require(`../packages/${configId}`)
			};
			if (configId === "typescript"){
				options.extensions = [".js", ".jsx", ".ts", ".tsx"];
			}
			const engine = new ESLint(options);
			for (const id in fixtures){
				const {ext, ignore, compatible} = fixtures[id];
				const source = readFileSync(join(fixturesFolder, `${id}/source.${ext}`), "utf8");
				const expected = readFileSync(join(fixturesFolder, `${id}/expected.${ext}`), "utf8");

				const actual = format(source, Object.assign({filepath: `source.${ext}`}, pkg.prettier));
				strictEqual(actual, expected, `prettier "${id}"`);

				if (compatible.includes(configId)){
					const filepath = join(tmpFolder, `source.${ext}`);
					writeFileSync(filepath, actual, "utf8");
					const results = await engine.lintFiles([filepath]);
					unlinkSync(filepath);

					const rules = {};
					results[0].messages.forEach(result => {
						if (result.fatal) {
							rules.fatal = result.message;
						} else {
							if (!ignore.includes(result.ruleId)) {
								rules[result.ruleId] = result.message;
							}
						}
					});
					deepStrictEqual(rules, {}, `eslint "${id}"`);
				}
			}
		});
	});
});
