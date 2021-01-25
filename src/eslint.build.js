/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */
"use strict";
const {strictEqual} = require("assert");
const {join} = require("path");
const {emptyDir} = require("fs-extra");
const {writeFileSync, readFileSync} = require("fs");
const pkg = require("../package.json");

const [,,,,,,,param7, param8] = process.argv;
const version = (param7 === "--version") ? param8 : "0.0.0";

console.log("process.argv", process.argv);
console.log("version", version);

/**
 * @param {"legacy"|"commonjs"|"typescript"} id
 * @return {Object}
 */
function getRules(id) {
	const rules = {};

	// Enforce "for" loop update clause moving the counter in the right direction.
	// @see https://eslint.org/docs/rules/for-direction
	rules["for-direction"] = "error";

	// Enforce `return` statements in getters
	// @see https://eslint.org/docs/rules/getter-return
	rules["getter-return"] = "error";

	// Disallow using an async function as a Promise executor
	// @see https://eslint.org/docs/rules/no-async-promise-executor
	rules["no-async-promise-executor"] = "error"; // NEW

	// Disallow `await` inside of loops
	// @see https://eslint.org/docs/rules/no-await-in-loop
	rules["no-await-in-loop"] = "off";

	// Disallow comparing against -0
	// @see https://eslint.org/docs/rules/no-compare-neg-zero
	rules["no-compare-neg-zero"] = "error";

	// Disallow assignment operators in conditional expressions
	// @see https://eslint.org/docs/rules/no-cond-assign
	rules["no-cond-assign"] = ["error", "always"];

	// Disallow the use of `console`
	// @see https://eslint.org/docs/rules/no-console
	rules["no-console"] = "off";

	// Disallow constant expressions in conditions
	// @see https://eslint.org/docs/rules/no-constant-condition
	rules["no-constant-condition"] = "error";

	// Disallow control characters in regular expressions
	// @see https://eslint.org/docs/rules/no-control-regex
	rules["no-control-regex"] = "error";

	// Disallow the use of `debugger`
	// @see https://eslint.org/docs/rules/no-debugger
	rules["no-debugger"] = "error";

	// Disallow duplicate arguments in `function` definitions
	// @see https://eslint.org/docs/rules/no-dupe-args
	rules["no-dupe-args"] = "error";

	// Disallow duplicate conditions in if-else-if chains
	// @see https://eslint.org/docs/rules/no-dupe-else-if
	rules["no-dupe-else-if"] = "error"; // NEW

	// Disallow duplicate keys in object literals
	// @see https://eslint.org/docs/rules/no-dupe-keys
	rules["no-dupe-keys"] = "error";

	// Disallow duplicate case labels
	// @see https://eslint.org/docs/rules/no-duplicate-case
	rules["no-duplicate-case"] = "error";

	// Disallow empty block statements
	// @see https://eslint.org/docs/rules/no-empty
	rules["no-empty"] = "error";

	// Disallow empty character classes in regular expressions
	// @see https://eslint.org/docs/rules/no-empty-character-class
	rules["no-empty-character-class"] = "error";

	// Disallow reassigning exceptions in `catch` clauses
	// @see https://eslint.org/docs/rules/no-ex-assign
	rules["no-ex-assign"] = "error";

	// Disallow unnecessary boolean casts
	// @see https://eslint.org/docs/rules/no-extra-boolean-cast
	rules["no-extra-boolean-cast"] = "error";

	// Disallow unnecessary parentheses
	// @see https://eslint.org/docs/rules/no-extra-parens
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
	rules["no-extra-parens"] = "off";
	if (id === "typescript"){
		rules["@typescript-eslint/no-extra-parens"] = "off";
	}

	// Disallow unnecessary semicolons
	// @see https://eslint.org/docs/rules/no-extra-semi
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
	if (id === "typescript"){
		rules["no-extra-semi"] = "off";
		rules["@typescript-eslint/no-extra-semi"] = "error";
	} else {
		rules["no-extra-semi"] = "error";
	}

	// Disallow reassigning `function` declarations
	// @see https://eslint.org/docs/rules/no-func-assign
	rules["no-func-assign"] = "error";

	// Disallow assigning to imported bindings
	// @see https://eslint.org/docs/rules/no-import-assign
	rules["no-import-assign"] = "off"; // NEW

	// Disallow variable or `function` declarations in nested blocks
	// @see https://eslint.org/docs/rules/no-inner-declarations
	rules["no-inner-declarations"] = "error";

	// Disallow invalid regular expression strings in `RegExp` constructors
	// @see https://eslint.org/docs/rules/no-invalid-regexp
	rules["no-invalid-regexp"] = "error";

	// Disallow irregular whitespace
	// @see https://eslint.org/docs/rules/no-irregular-whitespace
	rules["no-irregular-whitespace"] = ["error", {skipStrings: true, skipComments: true, skipRegExps: true, skipTemplates: true}];

	// Disallow literal numbers that lose precision
	// @see https://eslint.org/docs/rules/no-loss-of-precision
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
	if (id === "typescript"){
		rules["no-loss-of-precision"] = "off";
		rules["@typescript-eslint/no-loss-of-precision"] = "error"; // NEW
	} else {
		rules["no-loss-of-precision"] = "error"; // NEW
	}

	// Disallow characters which are made with multiple code points in character class syntax
	// @see https://eslint.org/docs/rules/no-misleading-character-class
	rules["no-misleading-character-class"] = "error"; // NEW

	// Disallow calling global object properties as functions
	// @see https://eslint.org/docs/rules/no-obj-calls
	rules["no-obj-calls"] = "error";

	// Disallow returning values from Promise executor functions
	// @see https://eslint.org/docs/rules/no-promise-executor-return
	rules["no-promise-executor-return"] = "error"; // NEW

	// Disallow calling some `Object.prototype` methods directly on objects
	// @see https://eslint.org/docs/rules/no-prototype-builtins
	rules["no-prototype-builtins"] = "error";

	// Disallow multiple spaces in regular expressions
	// @see https://eslint.org/docs/rules/no-regex-spaces
	rules["no-regex-spaces"] = "warn";

	// Disallow returning values from setters
	// @see https://eslint.org/docs/rules/no-setter-return
	rules["no-setter-return"] = (id === "legacy") ? "off" : "error"; // NEW

	// Disallow sparse arrays
	// @see https://eslint.org/docs/rules/no-sparse-arrays
	rules["no-sparse-arrays"] = "error";

	// Disallow template literal placeholder syntax in regular strings
	// @see https://eslint.org/docs/rules/no-template-curly-in-string
	rules["no-template-curly-in-string"] = (id === "legacy") ? "off" : "error"; // NEW commonjs used to be off

	// Disallow confusing multiline expressions
	// @see https://eslint.org/docs/rules/no-unexpected-multiline
	rules["no-unexpected-multiline"] = "error";

	// Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements
	// @see https://eslint.org/docs/rules/no-unreachable
	rules["no-unreachable"] = "error";

	// Disallow loops with a body that allows only one iteration
	// @see https://eslint.org/docs/rules/no-unreachable-loop
	rules["no-unreachable-loop"] = "off"; // NEW

	// Disallow control flow statements in `finally` blocks
	// @see https://eslint.org/docs/rules/no-unsafe-finally
	rules["no-unsafe-finally"] = "error";

	// Disallow negating the left operand of relational operators
	// @see https://eslint.org/docs/rules/no-unsafe-negation
	rules["no-unsafe-negation"] = "error";

	// Disallow use of optional chaining in contexts where the `undefined` value is not allowed
	// @see https://eslint.org/docs/rules/no-unsafe-optional-chaining
	rules["no-unsafe-optional-chaining"] = "off"; // NEW

	// Disallow useless backreferences in regular expressions
	// @see https://eslint.org/docs/rules/no-useless-backreference
	rules["no-useless-backreference"] = "error"; // NEW

	// Disallow assignments that can lead to race conditions due to usage of `await` or `yield`
	// @see https://eslint.org/docs/rules/require-atomic-updates
	rules["require-atomic-updates"] = (id === "legacy") ? "off" : "error"; // NEW

	// Require calls to `isNaN()` when checking for `NaN`
	// @see https://eslint.org/docs/rules/use-isnan
	rules["use-isnan"] = "error";

	// Enforce comparing `typeof` expressions against valid strings
	// @see https://eslint.org/docs/rules/valid-typeof
	rules["valid-typeof"] = "error";

	// Enforce getter and setter pairs in objects and classes
	// @see https://eslint.org/docs/rules/accessor-pairs
	rules["accessor-pairs"] = ["error", {setWithoutGet: true, getWithoutSet: false}];

	// Enforce `return` statements in callbacks of array methods
	// @see https://eslint.org/docs/rules/array-callback-return
	rules["array-callback-return"] = "error";

	// Enforce the use of variables within the scope they are defined
	// @see https://eslint.org/docs/rules/block-scoped-var
	rules["block-scoped-var"] = "error";

	// Enforce that class methods utilize `this`
	// @see https://eslint.org/docs/rules/class-methods-use-this
	rules["class-methods-use-this"] = (id === "legacy") ? "off" : "error"; // NEW commonjs used to be off

	// Enforce a maximum cyclomatic complexity allowed in a program
	// @see https://eslint.org/docs/rules/complexity
	rules["complexity"] = "off";

	// Require `return` statements to either always or never specify values
	// @see https://eslint.org/docs/rules/consistent-return
	rules["consistent-return"] = "error";

	// Enforce consistent brace style for all control statements
	// @see https://eslint.org/docs/rules/curly
	rules["curly"] = "error";

	// Require `default` cases in `switch` statements
	// @see https://eslint.org/docs/rules/default-case
	rules["default-case"] = "off";

	// Enforce default clauses in switch statements to be last
	// @see https://eslint.org/docs/rules/default-case-last
	rules["default-case-last"] = "error"; // NEW

	// Enforce default parameters to be last
	// @see https://eslint.org/docs/rules/default-param-last
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
	rules["default-param-last"] = "off"; // NEW
	rules["@typescript-eslint/default-param-last"] = "off"; // NEW

	// Enforce consistent newlines before and after dots
	// @see https://eslint.org/docs/rules/dot-location
	rules["dot-location"] = ["error", "property"];

	// Enforce dot notation whenever possible
	// @see https://eslint.org/docs/rules/dot-notation
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
	if (id === "typescript"){
		rules["dot-notation"] = "off";
		rules["@typescript-eslint/dot-notation"] = "error";
	} else {
		rules["dot-notation"] = "error";
	}

	// Require the use of `===` and `!==`
	// @see https://eslint.org/docs/rules/eqeqeq
	rules["eqeqeq"] = "error";

	// Require grouped accessor pairs in object literals and classes
	// @see https://eslint.org/docs/rules/grouped-accessor-pairs
	rules["grouped-accessor-pairs"] = "off"; // NEW

	// Require `for-in` loops to include an `if` statement
	// @see https://eslint.org/docs/rules/guard-for-in
	rules["guard-for-in"] = "off";

	// Enforce a maximum number of classes per file
	// @see https://eslint.org/docs/rules/max-classes-per-file
	rules["max-classes-per-file"] = "off"; // NEW

	// Disallow the use of `alert`, `confirm`, and `prompt`
	// @see https://eslint.org/docs/rules/no-alert
	rules["no-alert"] = "error";

	// Disallow the use of `arguments.caller` or `arguments.callee`
	// @see https://eslint.org/docs/rules/no-caller
	rules["no-caller"] = "error";

	// Disallow lexical declarations in case clauses
	// @see https://eslint.org/docs/rules/no-case-declarations
	rules["no-case-declarations"] = "error";

	// Disallow returning value from constructor
	// @see https://eslint.org/docs/rules/no-constructor-return
	rules["no-constructor-return"] = "error"; // NEW

	// Disallow division operators explicitly at the beginning of regular expressions
	// @see https://eslint.org/docs/rules/no-div-regex
	rules["no-div-regex"] = "error";

	// Disallow `else` blocks after `return` statements in `if` statements
	// @see https://eslint.org/docs/rules/no-else-return
	rules["no-else-return"] = "error";

	// Disallow empty functions
	// @see https://eslint.org/docs/rules/no-empty-function
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
	if (id === "typescript"){
		rules["no-empty-function"] = "off";
		rules["@typescript-eslint/no-empty-function"] = "warn";
	} else {
		rules["no-empty-function"] = "warn";
	}

	// Disallow empty destructuring patterns
	// @see https://eslint.org/docs/rules/no-empty-pattern
	rules["no-empty-pattern"] = "error";

	// Disallow `null` comparisons without type-checking operators
	// @see https://eslint.org/docs/rules/no-eq-null
	rules["no-eq-null"] = "error";

	// Disallow the use of `eval()`
	// @see https://eslint.org/docs/rules/no-eval
	rules["no-eval"] = "error";

	// Disallow extending native types
	// @see https://eslint.org/docs/rules/no-extend-native
	rules["no-extend-native"] = "error";

	// Disallow unnecessary calls to `.bind()`
	// @see https://eslint.org/docs/rules/no-extra-bind
	rules["no-extra-bind"] = "error";

	// Disallow unnecessary labels
	// @see https://eslint.org/docs/rules/no-extra-label
	rules["no-extra-label"] = "off";

	// Disallow fallthrough of `case` statements
	// @see https://eslint.org/docs/rules/no-fallthrough
	rules["no-fallthrough"] = "error";

	// Disallow leading or trailing decimal points in numeric literals
	// @see https://eslint.org/docs/rules/no-floating-decimal
	rules["no-floating-decimal"] = "error";

	// Disallow assignments to native objects or read-only global variables
	// @see https://eslint.org/docs/rules/no-global-assign
	rules["no-global-assign"] = "error";

	// Disallow shorthand type conversions
	// @see https://eslint.org/docs/rules/no-implicit-coercion
	rules["no-implicit-coercion"] = "error";

	// Disallow declarations in the global scope
	// @see https://eslint.org/docs/rules/no-implicit-globals
	rules["no-implicit-globals"] = (id === "typescript") ? "error" : "off"; // NEW: typescript used to be off

	// Disallow the use of `eval()`-like methods
	// @see https://eslint.org/docs/rules/no-implied-eval
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
	if (id === "typescript"){
		rules["no-implied-eval"] = "off";
		rules["@typescript-eslint/no-implied-eval"] = "error";
	} else {
		rules["no-implied-eval"] = "error";
	}

	// Disallow `this` keywords outside of classes or class-like objects
	// @see https://eslint.org/docs/rules/no-invalid-this
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
	if (id === "typescript"){
		rules["no-invalid-this"] = "off";
		rules["@typescript-eslint/no-invalid-this"] = "off";
	} else {
		rules["no-invalid-this"] = "error";
	}

	// Disallow the use of the `__iterator__` property
	// @see https://eslint.org/docs/rules/no-iterator
	rules["no-iterator"] = "error";

	// Disallow labeled statements
	// @see https://eslint.org/docs/rules/no-labels
	rules["no-labels"] = "error";

	// Disallow unnecessary nested blocks
	// @see https://eslint.org/docs/rules/no-lone-blocks
	rules["no-lone-blocks"] = "error";

	// Disallow function declarations that contain unsafe references inside loop statements
	// @see https://eslint.org/docs/rules/no-loop-func
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
	if (id === "typescript"){
		rules["no-loop-func"] = "off";
		rules["@typescript-eslint/no-loop-func"] = "error";
	} else {
		rules["no-loop-func"] = "error";
	}

	// Disallow magic numbers
	// @see https://eslint.org/docs/rules/no-magic-numbers
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
	if (id === "typescript"){
		rules["no-magic-numbers"] = "off";
		rules["@typescript-eslint/no-magic-numbers"] = "off";
	} else {
		rules["no-magic-numbers"] = "off";
	}

	// Disallow multiple spaces
	// @see https://eslint.org/docs/rules/no-multi-spaces
	rules["no-multi-spaces"] = "error";

	// Disallow multiline strings
	// @see https://eslint.org/docs/rules/no-multi-str
	rules["no-multi-str"] = "error";

	// Disallow `new` operators outside of assignments or comparisons
	// @see https://eslint.org/docs/rules/no-new
	rules["no-new"] = "error";

	// Disallow `new` operators with the `Function` object
	// @see https://eslint.org/docs/rules/no-new-func
	rules["no-new-func"] = "off";

	// Disallow `new` operators with the `String`, `Number`, and `Boolean` objects
	// @see https://eslint.org/docs/rules/no-new-wrappers
	rules["no-new-wrappers"] = "error";

	// Disallow `\8` and `\9` escape sequences in string literals
	// @see https://eslint.org/docs/rules/no-nonoctal-decimal-escape
	rules["no-nonoctal-decimal-escape"] = "error"; // NEW

	// Disallow octal literals
	// @see https://eslint.org/docs/rules/no-octal
	rules["no-octal"] = "error";

	// Disallow octal escape sequences in string literals
	// @see https://eslint.org/docs/rules/no-octal-escape
	rules["no-octal-escape"] = "error";

	// Disallow reassigning `function` parameters
	// @see https://eslint.org/docs/rules/no-param-reassign
	rules["no-param-reassign"] = "error";

	// Disallow the use of the `__proto__` property
	// @see https://eslint.org/docs/rules/no-proto
	rules["no-proto"] = "error";

	// Disallow variable redeclaration
	// @see https://eslint.org/docs/rules/no-redeclare
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
	if (id === "typescript"){
		rules["no-redeclare"] = "off";
		rules["@typescript-eslint/no-redeclare"] = "error";
	} else {
		rules["no-redeclare"] = "error";
	}

	// Disallow certain properties on certain objects
	// @see https://eslint.org/docs/rules/no-restricted-properties
	rules["no-restricted-properties"] = "off";

	// Disallow assignment operators in `return` statements
	// @see https://eslint.org/docs/rules/no-return-assign
	rules["no-return-assign"] = "error";

	// Disallow unnecessary `return await`
	// @see https://eslint.org/docs/rules/no-return-await
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
	if (id === "typescript"){
		rules["no-return-await"] = "off";
		rules["@typescript-eslint/return-await"] = "error"; // slightly different name
	} else if (id === "typescript"){
		rules["no-return-await"] = "error"; // NEW commonjs was off
	} else {
		rules["no-return-await"] = "off";
	}

	// Disallow `javascript:` urls
	// @see https://eslint.org/docs/rules/no-script-url
	rules["no-script-url"] = "error";

	// Disallow assignments where both sides are exactly the same
	// @see https://eslint.org/docs/rules/no-self-assign
	rules["no-self-assign"] = "error";

	// Disallow comparisons where both sides are exactly the same
	// @see https://eslint.org/docs/rules/no-self-compare
	rules["no-self-compare"] = "error";

	// Disallow comma operators
	// @see https://eslint.org/docs/rules/no-sequences
	rules["no-sequences"] = "error";

	// Disallow throwing literals as exceptions
	// @see https://eslint.org/docs/rules/no-throw-literal
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
	if (id === "typescript"){
		rules["no-throw-literal"] = "off";
		rules["@typescript-eslint/no-throw-literal"] = "error";
	} else {
		rules["no-throw-literal"] = "error";
	}

	// Disallow unmodified loop conditions
	// @see https://eslint.org/docs/rules/no-unmodified-loop-condition
	rules["no-unmodified-loop-condition"] = "error";

	// Disallow unused expressions
	// @see https://eslint.org/docs/rules/no-unused-expressions
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
	if (id === "typescript"){
		rules["no-unused-expressions"] = "off";
		rules["@typescript-eslint/no-unused-expressions"] = "warn";
	} else {
		rules["no-unused-expressions"] = "warn";
	}

	// Disallow unused labels
	// @see https://eslint.org/docs/rules/no-unused-labels
	rules["no-unused-labels"] = "off";

	// Disallow unnecessary calls to `.call()` and `.apply()`
	// @see https://eslint.org/docs/rules/no-useless-call
	rules["no-useless-call"] = "warn";

	// Disallow unnecessary `catch` clauses
	// @see https://eslint.org/docs/rules/no-useless-catch
	rules["no-useless-catch"] = "error"; // NEW

	// Disallow unnecessary concatenation of literals or template literals
	// @see https://eslint.org/docs/rules/no-useless-concat
	rules["no-useless-concat"] = "error";

	// Disallow unnecessary escape characters
	// @see https://eslint.org/docs/rules/no-useless-escape
	rules["no-useless-escape"] = "warn";

	// Disallow redundant return statements
	// @see https://eslint.org/docs/rules/no-useless-return
	rules["no-useless-return"] = "error";

	// Disallow `void` operators
	// @see https://eslint.org/docs/rules/no-void
	rules["no-void"] = "error";

	// Disallow specified warning terms in comments
	// @see https://eslint.org/docs/rules/no-warning-comments
	rules["no-warning-comments"] = ["warn", {terms: ["todo", "todelete", "uncomment", "eslint-disable-line"], location: "anywhere"}];

	// Disallow `with` statements
	// @see https://eslint.org/docs/rules/no-with
	rules["no-with"] = "error";

	// Enforce using named capture group in regular expression
	// @see https://eslint.org/docs/rules/prefer-named-capture-group
	rules["prefer-named-capture-group"] = 'off'; // NEW

	// Require using Error objects as Promise rejection reasons
	// @see https://eslint.org/docs/rules/prefer-promise-reject-errors
	rules["prefer-promise-reject-errors"] = "off";

	// Disallow use of the `RegExp` constructor in favor of regular expression literals
	// @see https://eslint.org/docs/rules/prefer-regex-literals
	rules["prefer-regex-literals"] = "error"; // NEW

	// Enforce the consistent use of the radix argument when using `parseInt()`
	// @see https://eslint.org/docs/rules/radix
	rules["radix"] = "error";

	// Disallow async functions which have no `await` expression
	// @see https://eslint.org/docs/rules/require-await
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
	rules["require-await"] = "off";
	if (id ==="typescript"){
		rules["@typescript-eslint/require-await"] = "off";
	}

	// Enforce the use of `u` flag on RegExp
	// @see https://eslint.org/docs/rules/require-unicode-regexp
	rules["require-unicode-regexp"] = "error"; // NEW

	// Require `var` declarations be placed at the top of their containing scope
	// @see https://eslint.org/docs/rules/vars-on-top
	rules["vars-on-top"] = (id === "legacy") ? "error" : "off"; // NEW commonjs was error

	// Require parentheses around immediate `function` invocations
	// @see https://eslint.org/docs/rules/wrap-iife
	rules["wrap-iife"] = ["error", "any"];

	// Require or disallow "Yoda" conditions
	// @see https://eslint.org/docs/rules/yoda
	rules["yoda"] = ["error", "never"];

	// Require or disallow strict mode directives
	// @see https://eslint.org/docs/rules/strict
	rules["strict"] = (id === "typescript") ? "off" : ["error", "global"];

	// Require or disallow initialization in variable declarations
	// @see https://eslint.org/docs/rules/init-declarations
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md
	rules["init-declarations"] = "off";
	rules["@typescript-eslint/init-declarations"] = "off";

	// Disallow deleting variables
	// @see https://eslint.org/docs/rules/no-delete-var
	rules["no-delete-var"] = "error";

	// Disallow labels that share a name with a variable
	// @see https://eslint.org/docs/rules/no-label-var
	rules["no-label-var"] = "off";

	// Disallow specified global variables
	// @see https://eslint.org/docs/rules/no-restricted-globals
	rules["no-restricted-globals"] = "off";

	// Disallow variable declarations from shadowing variables declared in the outer scope
	// @see https://eslint.org/docs/rules/no-shadow
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
	if (id === "typescript"){
		rules["no-shadow"] = "off";
		rules["@typescript-eslint/no-shadow"] = ["error", {builtinGlobals: true, hoist: "all"}];
	} else {
		rules["no-shadow"] = ["error", {builtinGlobals: true, hoist: "all"}];
	}

	// Disallow identifiers from shadowing restricted names
	// @see https://eslint.org/docs/rules/no-shadow-restricted-names
	rules["no-shadow-restricted-names"] = "error";

	// Disallow the use of undeclared variables unless mentioned in `/ * global * /` comments
	// @see https://eslint.org/docs/rules/no-undef
	rules["no-undef"] = "error";

	// Disallow initializing variables to `undefined`
	// @see https://eslint.org/docs/rules/no-undef-init
	rules["no-undef-init"] = "error";

	// Disallow the use of `undefined` as an identifier
	// @see https://eslint.org/docs/rules/no-undefined
	rules["no-undefined"] = "off";

	// Disallow unused variables
	// @see https://eslint.org/docs/rules/no-unused-vars
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
	if (id === "typescript"){
		rules["no-unused-vars"] = "off";
		rules["@typescript-eslint/no-unused-vars"] = ["error", {ignoreRestSiblings: true, argsIgnorePattern: "^_", varsIgnorePattern: "^_"}];
	} else {
		rules["no-unused-vars"] = ["error", {ignoreRestSiblings: true, argsIgnorePattern: "^_", varsIgnorePattern: "^_"}];
	}

	// Disallow the use of variables before they are defined
	// @see https://eslint.org/docs/rules/no-use-before-define
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
	if (id === "typescript"){
		rules["no-use-before-define"] = "off";
		rules["@typescript-eslint/no-use-before-define"] = ["error", {functions: false, classes: true}];
	} else {
		rules["no-use-before-define"] = ["error", {functions: false, classes: true}];
	}

	// Enforce linebreaks after opening and before closing array brackets
	// @see https://eslint.org/docs/rules/array-bracket-newline
	rules["array-bracket-newline"] = ["error", "consistent"];

	// Enforce consistent spacing inside array brackets
	// @see https://eslint.org/docs/rules/array-bracket-spacing
	rules["array-bracket-spacing"] = ["error", "never"];

	// Enforce line breaks after each array element
	// @see https://eslint.org/docs/rules/array-element-newline
	rules["array-element-newline"] = "off";

	// Disallow or enforce spaces inside of blocks after opening block and before closing block
	// @see https://eslint.org/docs/rules/block-spacing
	rules["block-spacing"] = ["error", "never"];

	// Enforce consistent brace style for blocks
	// @see https://eslint.org/docs/rules/brace-style
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
	if (id === "typescript"){
		rules["brace-style"] = "off";
		rules["@typescript-eslint/brace-style"] = ["error", "1tbs", {allowSingleLine: false}];
	} else {
		rules["brace-style"] = ["error", "1tbs", {allowSingleLine: false}];
	}

	// Enforce camelcase naming convention
	// @see https://eslint.org/docs/rules/camelcase
	rules["camelcase"] = "off";

	// Enforce or disallow capitalization of the first letter of a comment
	// @see https://eslint.org/docs/rules/capitalized-comments
	rules["capitalized-comments"] = "off";

	// Require or disallow trailing commas
	// @see https://eslint.org/docs/rules/comma-dangle
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
	if (id === "typescript"){
		rules["comma-dangle"] = "off";
		rules["@typescript-eslint/comma-dangle"] = ["error", "never"];
	} else {
		rules["comma-dangle"] = ["error", "never"];
	}

	// Enforce consistent spacing before and after commas
	// @see https://eslint.org/docs/rules/comma-spacing
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
	if (id === "typescript"){
		rules["comma-spacing"] = "off";
		rules["@typescript-eslint/comma-spacing"] = ["error", {before: false, after: true}];
	} else {
		rules["comma-spacing"] = ["error", {before: false, after: true}];
	}

	// Enforce consistent comma style
	// @see https://eslint.org/docs/rules/comma-style
	rules["comma-style"] = ["error", "last"];

	// Enforce consistent spacing inside computed property brackets
	// @see https://eslint.org/docs/rules/computed-property-spacing
	rules["computed-property-spacing"] = ["error", "never"];

	// Enforce consistent naming when capturing the current execution context
	// @see https://eslint.org/docs/rules/consistent-this
	rules["consistent-this"] = ["error", "self"];

	// Require or disallow newline at the end of files
	// @see https://eslint.org/docs/rules/eol-last
	rules["eol-last"] = "error";

	// Require or disallow spacing between function identifiers and their invocations
	// @see https://eslint.org/docs/rules/func-call-spacing
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
	if (id === "typescript"){
		rules["func-call-spacing"] = "off";
		rules["@typescript-eslint/func-call-spacing"] = ["error", "never"];
	} else {
		rules["func-call-spacing"] = ["error", "never"];
	}

	// Require function names to match the name of the variable or property to which they are assigned
	// @see https://eslint.org/docs/rules/func-name-matching
	rules["func-name-matching"] = "off";

	// Eequire or disallow named `function` expressions
	// @see https://eslint.org/docs/rules/func-names
	rules["func-names"] = "off";

	// Enforce the consistent use of either `function` declarations or expressions
	// @see https://eslint.org/docs/rules/func-style
	rules["func-style"] = ["error", "declaration", {allowArrowFunctions: true}];

	// Enforce line breaks between arguments of a function call
	// @see https://eslint.org/docs/rules/function-call-argument-newline
	rules["function-call-argument-newline"] = "off"; // NEW

	// Enforce consistent line breaks inside function parentheses
	// @see https://eslint.org/docs/rules/function-paren-newline
	rules["function-paren-newline"] = ["error", "consistent"];

	// Disallow specified identifiers
	// @see https://eslint.org/docs/rules/id-denylist
	rules["id-denylist"] = "off";

	// Enforce minimum and maximum identifier lengths
	// @see https://eslint.org/docs/rules/id-length
	rules["id-length"] = "off";

	// Require identifiers to match a specified regular expression
	// @see https://eslint.org/docs/rules/id-match
	rules["id-match"] = "off";

	// Enforce the location of arrow function bodies
	// @see https://eslint.org/docs/rules/implicit-arrow-linebreak
	rules["implicit-arrow-linebreak"] = "off"; // NEW

	// Enforce consistent indentation
	// @see https://eslint.org/docs/rules/indent
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
	// @warning That rule has no option to align "break" with "case": https://github.com/eslint/eslint/issues/1798#issuecomment-121328852
	if (id === "typescript"){
		rules["indent"] = "off";
		rules["@typescript-eslint/indent"] = ["error", "tab", {SwitchCase: 1, MemberExpression: "off"}];
	} else {
		rules["indent"] = ["error", "tab", {SwitchCase: 1, MemberExpression: "off"}];
	}

	// Enforce the consistent use of either double or single quotes in JSX attributes
	// @see https://eslint.org/docs/rules/jsx-quotes
	rules["jsx-quotes"] = ["error", "prefer-double"];

	// Enforce consistent spacing between keys and values in object literal properties
	// @see https://eslint.org/docs/rules/key-spacing
	rules["key-spacing"] = ["error", {beforeColon: false, afterColon: true}];

	// Enforce consistent spacing before and after keywords
	// @see https://eslint.org/docs/rules/keyword-spacing
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
	if (id === "typescript"){
		rules["keyword-spacing"] = "off";
		rules["@typescript-eslint/keyword-spacing"] = ["error", {before: true, after: true}];
	} else {
		rules["keyword-spacing"] = ["error", {before: true, after: true}];
	}

	// Enforce position of line comments
	// @see https://eslint.org/docs/rules/line-comment-position
	rules["line-comment-position"] = ["error", {position: "above", applyDefaultIgnorePatterns: false}];

	// Enforce consistent linebreak style
	// @see https://eslint.org/docs/rules/linebreak-style
	rules["linebreak-style"] = ["error", "unix"];

	// Require empty lines around comments
	// @see https://eslint.org/docs/rules/lines-around-comment
	rules["lines-around-comment"] = "off";

	// Require or disallow an empty line between class members
	// @see https://eslint.org/docs/rules/lines-between-class-members
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
	rules["lines-between-class-members"] = "off";
	rules["@typescript-eslint/lines-between-class-members"] = "off";

	// Enforce a maximum depth that blocks can be nested
	// @see https://eslint.org/docs/rules/max-depth
	rules["max-depth"] = ["error", {max: 8}];

	// Enforce a maximum line length
	// @see https://eslint.org/docs/rules/max-len
	rules["max-len"] = [1, 180, 4, {ignoreComments: true, ignoreUrls: true}];

	// Enforce a maximum number of lines per file
	// @see https://eslint.org/docs/rules/max-lines
	rules["max-lines"] = "off";

	// Enforce a maximum number of line of code in a function
	// @see https://eslint.org/docs/rules/max-lines-per-function
	rules["max-lines-per-function"] = "off"; // NEW

	// Enforce a maximum depth that callbacks can be nested
	// @see https://eslint.org/docs/rules/max-nested-callbacks
	rules["max-nested-callbacks"] = ["error", 5];

	// Enforce a maximum number of parameters in function definitions
	// @see https://eslint.org/docs/rules/max-params
	rules["max-params"] = ["error", 10];

	// Enforce a maximum number of statements allowed in function blocks
	// @see https://eslint.org/docs/rules/max-statements
	rules["max-statements"] = ["error", 100];

	// Enforce a maximum number of statements allowed per line
	// @see https://eslint.org/docs/rules/max-statements-per-line
	rules["max-statements-per-line"] = ["error", {max: 1}];

	// Enforce a particular style for multiline comments
	// @see https://eslint.org/docs/rules/multiline-comment-style
	rules["multiline-comment-style"] = "off";

	// Enforce newlines between operands of ternary expressions
	// @see https://eslint.org/docs/rules/multiline-ternary
	rules["multiline-ternary"] = ["error", "never"];

	// Require constructor names to begin with a capital letter
	// @see https://eslint.org/docs/rules/new-cap
	rules["new-cap"] = ["error", {newIsCap: true, capIsNew: true}];

	// Enforce or disallow parentheses when invoking a constructor with no arguments
	// @see https://eslint.org/docs/rules/new-parens
	rules["new-parens"] = "error";

	// Require a newline after each call in a method chain
	// @see https://eslint.org/docs/rules/newline-per-chained-call
	rules["newline-per-chained-call"] = ["error", {ignoreChainWithDepth: 5}];

	// Disallow `Array` constructors
	// @see https://eslint.org/docs/rules/no-array-constructor
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
	if (id === "typescript"){
		rules["no-array-constructor"] = "off";
		rules["@typescript-eslint/no-array-constructor"] = "error";
	} else {
		rules["no-array-constructor"] = "error";
	}

	// Disallow bitwise operators
	// @see https://eslint.org/docs/rules/no-bitwise
	rules["no-bitwise"] = "error";

	// Disallow `continue` statements
	// @see https://eslint.org/docs/rules/no-continue
	rules["no-continue"] = "error";

	// Disallow inline comments after code
	// @see https://eslint.org/docs/rules/no-inline-comments
	rules["no-inline-comments"] = "off";

	// Disallow `if` statements as the only statement in `else` blocks
	// @see https://eslint.org/docs/rules/no-lonely-if
	rules["no-lonely-if"] = "error";

	// Disallow mixed binary operators
	// @see https://eslint.org/docs/rules/no-mixed-operators
	rules["no-mixed-operators"] = ["error", {"allowSamePrecedence": true}];

	// Disallow mixed spaces and tabs for indentation
	// @see https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
	rules["no-mixed-spaces-and-tabs"] = "error";

	// Disallow use of chained assignment expressions
	// @see https://eslint.org/docs/rules/no-multi-assign
	rules["no-multi-assign"] = "error";

	// Disallow multiple empty lines
	// @see https://eslint.org/docs/rules/no-multiple-empty-lines
	rules["no-multiple-empty-lines"] = ["error", {max: 2, maxEOF: 1, maxBOF: 1}];

	// Disallow negated conditions
	// @see https://eslint.org/docs/rules/no-negated-condition
	rules["no-negated-condition"] = "off";

	// Disallow nested ternary expressions
	// @see https://eslint.org/docs/rules/no-nested-ternary
	rules["no-nested-ternary"] = "error";

	// Disallow `Object` constructors
	// @see https://eslint.org/docs/rules/no-new-object
	rules["no-new-object"] = "error";

	// Disallow the unary operators `++` and `--`
	// @see https://eslint.org/docs/rules/no-plusplus
	rules["no-plusplus"] = "off";

	// Disallow specified syntax
	// @see https://eslint.org/docs/rules/no-restricted-syntax
	if (id === "legacy"){
		rules["no-restricted-syntax"] = [
			"error",
			"WithStatement",
			"ImportDeclaration",
			"ImportSpecifier",
			"ImportDefaultSpecifier",
			"ImportNamespaceSpecifier",
			"ExportDefaultDeclaration",
			"ExportNamedDeclaration",
			"ExportAllDeclaration",
			"ExportSpecifier"
		];
	} else {
		rules["no-restricted-syntax"] = ["error", "WithStatement"];
	}

	// Disallow all tabs
	// @see https://eslint.org/docs/rules/no-tabs
	rules["no-tabs"] = "off";

	// Disallow ternary operators
	// @see https://eslint.org/docs/rules/no-ternary
	rules["no-ternary"] = "off";

	// Disallow trailing whitespace at the end of lines
	// @see https://eslint.org/docs/rules/no-trailing-spaces
	rules["no-trailing-spaces"] = "error";

	// Disallow dangling underscores in identifiers
	// @see https://eslint.org/docs/rules/no-underscore-dangle
	rules["no-underscore-dangle"] = "off";

	// Disallow ternary operators when simpler alternatives exist
	// @see https://eslint.org/docs/rules/no-unneeded-ternary
	rules["no-unneeded-ternary"] = "error";

	// Disallow whitespace before properties
	// @see https://eslint.org/docs/rules/no-whitespace-before-property
	rules["no-whitespace-before-property"] = "error";

	// Enforce the location of single-line statements
	// @see https://eslint.org/docs/rules/nonblock-statement-body-position
	rules["nonblock-statement-body-position"] = "off";

	// Enforce consistent line breaks inside braces
	// @see https://eslint.org/docs/rules/object-curly-newline
	rules["object-curly-newline"] = "off";

	// Enforce consistent spacing inside braces
	// @see https://eslint.org/docs/rules/object-curly-spacing
	rules["object-curly-spacing"] = "off";

	// Enforce placing object properties on separate lines
	// @see https://eslint.org/docs/rules/object-property-newline
	rules["object-property-newline"] = "off";

	// Enforce variables to be declared either together or separately in functions
	// @see https://eslint.org/docs/rules/one-var
	rules["one-var"] = ["error", "never"];

	// Require or disallow newlines around variable declarations
	// @see https://eslint.org/docs/rules/one-var-declaration-per-line
	rules["one-var-declaration-per-line"] = ["error", "always"];

	// Require or disallow assignment operator shorthand where possible
	// @see https://eslint.org/docs/rules/operator-assignment
	rules["operator-assignment"] = ["error", "always"];

	// Enforce consistent linebreak style for operators
	// @see https://eslint.org/docs/rules/operator-linebreak
	rules["operator-linebreak"] = ["error", "after"];

	// Require or disallow padding within blocks
	// @see https://eslint.org/docs/rules/padded-blocks
	rules["padded-blocks"] = "off";

	// Require or disallow padding lines between statements
	// @see https://eslint.org/docs/rules/padding-line-between-statements
	rules["padding-line-between-statements"] = "off";

	// Disallow the use of `Math.pow` in favor of the `**` operator
	// @see https://eslint.org/docs/rules/prefer-exponentiation-operator
	rules["prefer-exponentiation-operator"] = (id === "legacy") ? "off" : "error"; // NEW

	// Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead.
	// @see https://eslint.org/docs/rules/prefer-object-spread
	rules["prefer-object-spread"] = "off"; // NEW

	// Require quotes around object literal property names
	// I'd want to require quotes around numbers, but Prettier has no option for it
	// @see https://eslint.org/docs/rules/quote-props
	rules["quote-props"] = ["error", "as-needed"];

	// Enforce the consistent use of either backticks, double, or single quotes
	// @see https://eslint.org/docs/rules/quotes
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
	if (id === "typescript"){
		rules["quotes"] = "off";
		rules["@typescript-eslint/quotes"] = ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}];
	} else {
		rules["quotes"] = ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}];
	}

	// Require or disallow semicolons instead of ASI
	// @see https://eslint.org/docs/rules/semi
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
	if (id === "typescript"){
		rules["semi"] = "off";
		rules["@typescript-eslint/semi"] = ["error", "always"];
	} else {
		rules["semi"] = ["error", "always"];
	}

	// Enforce consistent spacing before and after semicolons
	// @see https://eslint.org/docs/rules/semi-spacing
	rules["semi-spacing"] = ["error", {before: false, after: true}];

	// Enforce location of semicolons
	// @see https://eslint.org/docs/rules/semi-style
	rules["semi-style"] = ["error", "last"];

	// Require object keys to be sorted
	// @see https://eslint.org/docs/rules/sort-keys
	rules["sort-keys"] = "off";

	// Require variables within the same declaration block to be sorted
	// @see https://eslint.org/docs/rules/sort-vars
	rules["sort-vars"] = "off";

	// Enforce consistent spacing before blocks
	// @see https://eslint.org/docs/rules/space-before-blocks
	rules["space-before-blocks"] = ["error", "always"];

	// Enforce consistent spacing before `function` definition opening parenthesis
	// @see https://eslint.org/docs/rules/space-before-function-paren
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
	if (id === "typescript"){
		rules["space-before-function-paren"] = "off";
		rules["@typescript-eslint/space-before-function-paren"] = ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}];
	} else {
		rules["space-before-function-paren"] = ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}];
	}

	// Enforce consistent spacing inside parentheses
	// @see https://eslint.org/docs/rules/space-in-parens
	rules["space-in-parens"] = ["error", "never"];

	// Require spacing around infix operators
	// @see https://eslint.org/docs/rules/space-infix-ops
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
	if (id === "typescript"){
		rules["space-infix-ops"] = "off";
		rules["@typescript-eslint/space-infix-ops"] = "error";
	} else {
		rules["space-infix-ops"] = "error";
	}

	// Enforce consistent spacing before or after unary operators
	// @see https://eslint.org/docs/rules/space-unary-ops
	rules["space-unary-ops"] = ["error", {words: true, nonwords: false}];

	// Enforce consistent spacing after the `//` or `/*` in a comment
	// @see https://eslint.org/docs/rules/spaced-comment
	rules["spaced-comment"] = "off";

	// Enforce spacing around colons of switch statements
	// @see https://eslint.org/docs/rules/switch-colon-spacing
	rules["switch-colon-spacing"] = "error";

	// Require or disallow spacing between template tags and their literals
	// @see https://eslint.org/docs/rules/template-tag-spacing
	rules["template-tag-spacing"] = (id === "legacy") ? "off" : ["error", "always"]; // NEW commonjs was off

	// Require or disallow Unicode byte order mark (BOM)
	// @see https://eslint.org/docs/rules/unicode-bom
	rules["unicode-bom"] = "error";

	// Require parenthesis around regex literals
	// @see https://eslint.org/docs/rules/wrap-regex
	rules["wrap-regex"] = "off";

	// Require braces around arrow function bodies
	// @see https://eslint.org/docs/rules/arrow-body-style
	rules["arrow-body-style"] = (id === "legacy") ? "off" : ["error", "as-needed"]; // NEW commonjs was off

	// Require parentheses around arrow function arguments
	// @see https://eslint.org/docs/rules/arrow-parens
	rules["arrow-parens"] = (id === "legacy") ? "off" : ["error", "always"]; // NEW commonjs was off

	// Enforce consistent spacing before and after the arrow in arrow functions
	// @see https://eslint.org/docs/rules/arrow-spacing
	rules["arrow-spacing"] = (id === "legacy") ? "off" : ["error", {before: true, after: true}]; // NEW commonjs was off

	// Require `super()` calls in constructors
	// @see https://eslint.org/docs/rules/constructor-super
	rules["constructor-super"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off

	// Enforce consistent spacing around `*` operators in generator functions
	// @see https://eslint.org/docs/rules/generator-star-spacing
	rules["generator-star-spacing"] = (id === "legacy") ? "off" : ["error", {before: false, after: true}]; // NEW commonjs was off

	// Disallow reassigning class members
	// @see https://eslint.org/docs/rules/no-class-assign
	rules["no-class-assign"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off

	// Disallow arrow functions where they could be confused with comparisons
	// @see https://eslint.org/docs/rules/no-confusing-arrow
	rules["no-confusing-arrow"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off

	// Disallow reassigning `const` variables
	// @see https://eslint.org/docs/rules/no-const-assign
	rules["no-const-assign"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off

	// Disallow duplicate class members
	// @see https://eslint.org/docs/rules/no-dupe-class-members
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
	if (id === "typescript"){
		rules["no-dupe-class-members"] = "off";
		rules["@typescript-eslint/no-dupe-class-members"] = "error";
	} else {
		rules["no-dupe-class-members"] = "error";
	}

	// Disallow duplicate module imports
	// @see https://eslint.org/docs/rules/no-duplicate-imports
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-duplicate-imports.md
	if (id === "typescript"){
		rules["no-duplicate-imports"] = "off";
		rules["@typescript-eslint/no-duplicate-imports"] = "error";
	} else {
		rules["no-duplicate-imports"] = "off";
	}

	// disallow `new` operators with the `Symbol` object
	// @see https://eslint.org/docs/rules/no-new-symbol
	rules["no-new-symbol"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// disallow specified names in exports
	// @see https://eslint.org/docs/rules/no-restricted-exports
	rules["no-restricted-exports"] = "off"; // NEW

	// disallow specified modules when loaded by `import`
	// @see https://eslint.org/docs/rules/no-restricted-imports
	rules["no-restricted-imports"] = "off";

	// disallow `this`/`super` before calling `super()` in constructors
	// @see https://eslint.org/docs/rules/no-this-before-super
	rules["no-this-before-super"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// Disallow unnecessary computed property keys in objects and classes
	// @see https://eslint.org/docs/rules/no-useless-computed-key
	rules["no-useless-computed-key"] = "error";

	// Disallow unnecessary constructors
	// @see https://eslint.org/docs/rules/no-useless-constructor
	// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
	if (id === "typescript"){
		rules["no-useless-constructor"] = "off";
		rules["@typescript-eslint/no-useless-constructor"] = "error";
	} else if (id === "commonjs"){
		rules["no-useless-constructor"] = "error"; // new commonjs was off
	} else {
		rules["no-useless-constructor"] = "off";
	}

	// Disallow renaming import, export, and destructured assignments to the same name
	// @see https://eslint.org/docs/rules/no-useless-rename
	rules["no-useless-rename"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// Require `let` or `const` instead of `var`
	// @see https://eslint.org/docs/rules/no-var
	rules["no-var"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// Require or disallow method and property shorthand syntax for object literals
	// @see https://eslint.org/docs/rules/object-shorthand
	rules["object-shorthand"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// Require using arrow functions for callbacks
	// @see https://eslint.org/docs/rules/prefer-arrow-callback
	rules["prefer-arrow-callback"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// Require `const` declarations for variables that are never reassigned after declared
	// @see https://eslint.org/docs/rules/prefer-const
	rules["prefer-const"] = ["error", {destructuring: "all"}];

	// Require destructuring from arrays and/or objects
	// @see https://eslint.org/docs/rules/prefer-destructuring
	rules["prefer-destructuring"] = (id === "legacy") ? "off" : ["error", {VariableDeclarator: {array: false, object: true}, AssignmentExpression: {array: false, object: false}}]; // NEW commonjs was off;

	// Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals
	// @see https://eslint.org/docs/rules/prefer-numeric-literals
	rules["prefer-numeric-literals"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// Require rest parameters instead of `arguments`
	// @see https://eslint.org/docs/rules/prefer-rest-params
	rules["prefer-rest-params"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// Require spread operators instead of `.apply()`
	// @see https://eslint.org/docs/rules/prefer-spread
	rules["prefer-spread"] = "error";

	// Require template literals instead of string concatenation
	// @see https://eslint.org/docs/rules/prefer-template
	rules["prefer-template"] = "off";

	// Require generator functions to contain `yield`
	// @see https://eslint.org/docs/rules/require-yield
	rules["require-yield"] = (id === "legacy") ? "off" : "error"; // NEW commonjs was off;

	// Enforce spacing between rest and spread operators and their expressions
	// @see https://eslint.org/docs/rules/rest-spread-spacing
	rules["rest-spread-spacing"] = ["error", "never"];

	// Enforce sorted import declarations within modules
	// @see https://eslint.org/docs/rules/sort-imports
	rules["sort-imports"] = "off";

	// Require symbol descriptions
	// @see https://eslint.org/docs/rules/symbol-description
	rules["symbol-description"] = "error";

	// Require or disallow spacing around embedded expressions of template strings
	// @see https://eslint.org/docs/rules/template-curly-spacing
	rules["template-curly-spacing"] = (id === "legacy") ? "off" : ["error", "never"]; // NEW commonjs was off;

	// Require or disallow spacing around the `*` in `yield*` expressions
	// @see https://eslint.org/docs/rules/yield-star-spacing
	rules["yield-star-spacing"] = ["error", {before: false, after: true}];

	if (id === "typescript"){
		// Require that member overloads be consecutive
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
		rules["@typescript-eslint/adjacent-overload-signatures"] = "off";

		// Requires using either T[] or Array<T> for arrays
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
		rules["@typescript-eslint/array-type"] = "off";

		// Disallows awaiting a value that is not a Thenable
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
		rules["@typescript-eslint/await-thenable"] = "error";

		// Bans @ts-<directive> comments from being used or requires descriptions after directive
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
		rules["@typescript-eslint/ban-ts-comment"] = "off"; // NEW

		// Bans // tslint:<rule-flag> comments from being used
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-tslint-comment.md
		rules["@typescript-eslint/ban-tslint-comment"] = "error"; // NEW

		// Bans specific types from being used
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
		rules["@typescript-eslint/ban-types"] = "off";

		// Ensures that literals on classes are exposed in a consistent style
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/class-literal-property-style.md
		// Disabled because it doesn't have my preference: getter when there is a setter, field otherwise.
		rules["@typescript-eslint/class-literal-property-style"] = "off"; // NEW

		// Enforce or disallow the use of the record type
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.md
		rules["@typescript-eslint/consistent-indexed-object-style"] = "off"; // NEW

		// Enforces consistent usage of type assertions
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
		rules["@typescript-eslint/consistent-type-assertions"] = "off"; // NEW

		// Consistent with type definition either interface or type
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
		rules["@typescript-eslint/consistent-type-definitions"] = "off";

		// Enforces consistent usage of type imports
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md
		rules["@typescript-eslint/consistent-type-imports"] = "off"; // NEW

		// Require explicit return types on functions and class methods
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
		rules["@typescript-eslint/explicit-function-return-type"] = ["error", {allowExpressions: true, allowHigherOrderFunctions: true, allowTypedFunctionExpressions: true}];

		// Require explicit accessibility modifiers on class properties and methods
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
		rules["@typescript-eslint/explicit-member-accessibility"] = ["error", {accessibility: "explicit"}];

		// Require explicit return and argument types on exported functions' and classes' public class methods
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
		rules["@typescript-eslint/explicit-module-boundary-types"] = "off"; // NEW

		// Require a specific member delimiter style for interfaces and type literals
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
		rules["@typescript-eslint/member-delimiter-style"] = [
			"error",
			{
				multiline: {
					delimiter: "semi",
					requireLast: true
				},
				singleline: {
					delimiter: "semi",
					requireLast: false
				}
			}
		];

		// Require a consistent member declaration order
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
		rules["@typescript-eslint/member-ordering"] = "off";

		// Enforces using a particular method signature syntax
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
		rules["@typescript-eslint/method-signature-style"] = "error"; // NEW

		// Enforces naming conventions for everything across a codebase
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
		rules["@typescript-eslint/naming-convention"] = "off"; // NEW

		// Requires that .toString() is only called on objects which provide useful information when stringified
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-base-to-string.md
		rules["@typescript-eslint/no-base-to-string"] = "off"; // NEW

		// Disallow non-null assertion in locations that may be confusing
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
		rules["@typescript-eslint/no-confusing-non-null-assertion"] = "off"; // NEW

		// Requires expressions of type void to appear in statement position
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-void-expression.md
		rules["@typescript-eslint/no-confusing-void-expression"] = "off"; // NEW

		// Disallow the delete operator with computed key expressions
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
		rules["@typescript-eslint/no-dynamic-delete"] = "off"; // NEW

		// Disallow the declaration of empty interfaces
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
		rules["@typescript-eslint/no-empty-interface"] = ["error", {allowSingleExtends: false}];

		// Disallow usage of the any type
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
		rules["@typescript-eslint/no-explicit-any"] = "off";

		// Disallow extra non-null assertion
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
		rules["@typescript-eslint/no-extra-non-null-assertion"] = "off"; // NEW

		// Forbids the use of classes as namespaces
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
		rules["@typescript-eslint/no-extraneous-class"] = "off";

		// Requires Promise-like values to be handled appropriately
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
		rules["@typescript-eslint/no-floating-promises"] = "error";

		// Disallow iterating over an array with a for-in loop
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-for-in-array.md
		rules["@typescript-eslint/no-for-in-array"] = "error";

		// Disallow usage of the implicit any type in catch clauses
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implicit-any-catch.md
		rules["@typescript-eslint/no-implicit-any-catch"] = "off"; // NEW

		// Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md
		rules["@typescript-eslint/no-inferrable-types"] = "off";

		// Disallows usage of void type outside of generic or return types
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
		rules["@typescript-eslint/no-invalid-void-type"] = "off"; // NEW

		// Enforce valid definition of new and constructor
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-new.md
		rules["@typescript-eslint/no-misused-new"] = "error";

		// Avoid using promises in places not designed to handle them
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
		rules["@typescript-eslint/no-misused-promises"] = "off"; // NEW

		// Disallow the use of custom TypeScript modules and namespaces
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
		rules["@typescript-eslint/no-namespace"] = "off";

		// Disallows using a non-null assertion after an optional chain expression
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
		rules["@typescript-eslint/no-non-null-asserted-optional-chain"] = "error"; // NEW

		// Disallows non-null assertions using the ! postfix operator
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
		rules["@typescript-eslint/no-non-null-assertion"] = "off";

		// Disallow the use of parameter properties in class constructors
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
		rules["@typescript-eslint/no-parameter-properties"] = ["error", {allows: ["readonly"]}];

		// Disallows invocation of require()
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
		rules["@typescript-eslint/no-require-imports"] = "off";

		// Disallow aliasing this
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md
		rules["@typescript-eslint/no-this-alias"] = ["error", {allowedNames: ["self"], allowDestructuring: true}];

		// Disallow the use of type aliases
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
		rules["@typescript-eslint/no-type-alias"] = "off";

		// Flags unnecessary equality comparisons against boolean literals
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
		rules["@typescript-eslint/no-unnecessary-boolean-literal-compare"] = "error"; // NEW

		// Prevents conditionals where the type is always truthy or always falsy
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
		rules["@typescript-eslint/no-unnecessary-condition"] = "off"; // NEW

		// Warns when a namespace qualifier is unnecessary
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
		rules["@typescript-eslint/no-unnecessary-qualifier"] = "off";

		// Enforces that type arguments will not be used if not required
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
		rules["@typescript-eslint/no-unnecessary-type-arguments"] = "off"; // NEW

		// Warns if a type assertion does not change the type of an expression
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
		rules["@typescript-eslint/no-unnecessary-type-assertion"] = "off";

		// Disallows unnecessary constraints on generic types
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-constraint.md
		rules["@typescript-eslint/no-unnecessary-type-constraint"] = "off"; // NEW

		// Disallows assigning any to variables and properties
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
		rules["@typescript-eslint/no-unsafe-assignment"] = "off"; // NEW

		// Disallows calling an any type value
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
		rules["@typescript-eslint/no-unsafe-call"] = "off"; // NEW

		// Disallows member access on any typed variables
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
		rules["@typescript-eslint/no-unsafe-member-access"] = "off"; // NEW

		// Disallows returning any from a function
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md
		rules["@typescript-eslint/no-unsafe-return"] = "off"; // NEW

		// Disallows the use of require statements except in import statements
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
		rules["@typescript-eslint/no-var-requires"] = "off";

		// Prefers a non-null assertion over explicit type cast when possible
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/non-nullable-type-assertion-style.md
		rules["@typescript-eslint/non-nullable-type-assertion-style"] = "off"; // NEW

		// Prefer usage of as const over literal type
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-as-const.md
		rules["@typescript-eslint/prefer-as-const"] = "off"; // NEW

		// Prefer initializing each enums member value
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-enum-initializers.md
		rules["@typescript-eslint/prefer-enum-initializers"] = "off"; // NEW

		// Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
		rules["@typescript-eslint/prefer-for-of"] = "off";

		// Use function types instead of interfaces with call signatures
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
		rules["@typescript-eslint/prefer-function-type"] = "off";

		// Enforce includes method over indexOf method
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-includes.md
		rules["@typescript-eslint/prefer-includes"] = "warn";

		// Require that all enum members be literal values to prevent unintended enum member name shadow issues
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.md
		rules["@typescript-eslint/prefer-literal-enum-member"] = "error"; // NEW

		// Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
		rules["@typescript-eslint/prefer-namespace-keyword"] = "off";

		// Enforce the usage of the nullish coalescing operator instead of logical chaining
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
		rules["@typescript-eslint/prefer-nullish-coalescing"] = "off"; // NEW

		// Prefer using concise optional chain expressions instead of chained logical ands
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
		rules["@typescript-eslint/prefer-optional-chain"] = "off"; // NEW

		// Requires that private members are marked as readonly if they're never modified outside of the constructor
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
		rules["@typescript-eslint/prefer-readonly"] = "error"; // NEW

		// Requires that function parameters are typed as readonly to prevent accidental mutation of inputs
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
		rules["@typescript-eslint/prefer-readonly-parameter-types"] = "off"; // NEW

		// Prefer using type parameter when calling Array#reduce instead of casting
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
		rules["@typescript-eslint/prefer-reduce-type-parameter"] = "off"; // NEW

		// Enforce that RegExp#exec is used instead of String#match if no global flag is provided
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
		rules["@typescript-eslint/prefer-regexp-exec"] = "error";

		// Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
		rules["@typescript-eslint/prefer-string-starts-ends-with"] = "error";

		// Recommends using @ts-expect-error over @ts-ignore
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
		rules["@typescript-eslint/prefer-ts-expect-error"] = "error"; // NEW

		// Requires any function or method that returns a Promise to be marked async
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
		rules["@typescript-eslint/promise-function-async"] = "error"; // NEW

		// Requires Array#sort calls to always provide a compareFunction
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
		rules["@typescript-eslint/require-array-sort-compare"] = "off";

		// When adding two variables, operands must both be of type number or of type string
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
		rules["@typescript-eslint/restrict-plus-operands"] = "off";

		// Enforce template literal expressions to be of string type
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
		rules["@typescript-eslint/restrict-template-expressions"] = "off"; // NEW

		// Enforces that members of a type union/intersection are sorted alphabetically
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/sort-type-union-intersection-members.md
		rules["@typescript-eslint/sort-type-union-intersection-members"] = "off"; // NEW

		// Restricts the types allowed in boolean expressions
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
		rules["@typescript-eslint/strict-boolean-expressions"] = "off"; // NEW

		// Exhaustiveness checking in switch with union type
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
		rules["@typescript-eslint/switch-exhaustiveness-check"] = "off"; // NEW

		// Sets preference level for triple slash directives versus ES6-style import declarations
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md
		rules["@typescript-eslint/triple-slash-reference"] = "off"; // NEW

		// Require consistent spacing around type annotations
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
		rules["@typescript-eslint/type-annotation-spacing"] = "off"; // NEW

		// Requires type annotations to exist
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
		rules["@typescript-eslint/typedef"] = "off"; // NEW

		// Enforces unbound methods are called with their expected scope
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
		rules["@typescript-eslint/unbound-method"] = "off";

		// Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter
		// @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
		rules["@typescript-eslint/unified-signatures"] = "off";
	}

	const simplified = {};
	Object.keys(rules).forEach(key => {
		const value = rules[key];
		if (value !== "off"){
			simplified[key] = value;
		}
	});
	return simplified;
}

function writeReadme({id, folder, name, title, description}){
	const filename = (id === "typescript") ? "template.ts.md" : "template.js.md";
	const data = readFileSync(join(__dirname, filename), "utf8")
	.replace(/%%name%%/g, name)
	.replace(/%%title%%/g, title)
	.replace(/%%description%%/g, description);
	writeFileSync(join(folder, "README.md"), data, "utf8");
}
function writePackage({folder, name, description, dependencies}){
	const data = {
		name,
		version,
		description,
		main: "index.js",
		files: ["index.js"],
		repository: "https://github.com/wildpeaks/packages-eslint-config",
		keywords: ["wildpeaks", "eslint", "eslintconfig"],
		author: "Cecile Muller",
		license: "MIT",
		bugs: {
			url: "https://github.com/wildpeaks/packages-eslint-config/issues"
		},
		homepage: "https://github.com/wildpeaks/packages-eslint-config#readme"
	};
	if (Array.isArray(dependencies)){
		const versions = {};
		for (const name of dependencies){
			const version = pkg.dependencies[name];
			strictEqual(typeof version, "string", `Version of ${name}`);
			versions[name] = version;
		}
		data.dependencies = versions;
	}
	writeFileSync(join(folder, "package.json"), JSON.stringify(data), "utf8");
}
function writeExports({folder, config}){
	const data = `module.exports = ${JSON.stringify(config)};`;
	writeFileSync(join(folder, "index.js"), data, "utf8");
}

describe("Legacy", function () {
	const id = "legacy";
	const name = `@wildpeaks/eslint-config-${id}`;
	const folder = join(process.cwd(), "packages", id);
	before(async function () {
		await emptyDir(folder);
	});
	it("README.md", function () {
		writeReadme({
			id,
			folder,
			name,
			title: "Legacy",
			description: "Settings for **ES5 Javascript** projects without modules.\n\nThis is best suited for **scripts running in older browsers**."
		});
	});
	it("package.json", function () {
		writePackage({
			folder,
			name,
			description: "ESLint config for ES5 Javascript projects without modules"
		});
	});
	it("index.js", function () {
		writeExports({
			folder,
			config: {
				parserOptions: {
					ecmaVersion: 5
				},
				rules: getRules(id)
			}
		});
	});
});
describe("CommonJS", function () {
	const id = "commonjs";
	const name = `@wildpeaks/eslint-config-${id}`;
	const folder = join(process.cwd(), "packages", id);
	before(async function () {
		await emptyDir(folder);
	});
	it("README.md", function () {
		writeReadme({
			id,
			folder,
			name,
			title: "CommonJS",
			description: "Settings for **ES2018 Javascript** projects using **CommonJS modules**.\n\nThis is best suited for **Node 14+ scripts**."
		});
	});
	it("package.json", function () {
		writePackage({
			folder,
			name,
			description: "ESLint config for ES2018 Javascript projects using CommonJS modules"
		});
	});
	it("index.js", function () {
		writeExports({
			folder,
			config: {
				env: {
					commonjs: true,
					es2017: true
				},
				globals: {
					module: true
				},
				parserOptions: {
					ecmaVersion: 2018
				},
				rules: getRules(id)
			}
		});
	});
});
describe("Typescript", function () {
	const id = "typescript";
	const name = `@wildpeaks/eslint-config-${id}`;
	const folder = join(process.cwd(), "packages", id);
	before(async function () {
		await emptyDir(folder);
	});
	it("README.md", function () {
		writeReadme({
			id,
			folder,
			name,
			title: "Typescript",
			description: "Settings for **ES2020 Typescript** projects using **ES Modules**.\n\nThis is best suited for **compiled projects** (e.g. Webpack)."
		});
	});
	it("package.json", function () {
		writePackage({
			folder,
			name,
			description: "ESLint config for ES2020 Typescript projects using ES Modules",
			dependencies: ["@typescript-eslint/eslint-plugin", "@typescript-eslint/parser"]
		});
	});
	it("index.js", function () {
		writeExports({
			folder,
			config: {
				env: {
					commonjs: true,
					es2020: true
				},
				globals: {
					module: true
				},
				plugins: ["@typescript-eslint"],
				parser: "@typescript-eslint/parser",
				parserOptions: {
					ecmaVersion: 2020,
					ecmaFeatures: {
						jsx: true,
						impliedStrict: true
					},
					sourceType: "module",
					project: "./tsconfig.json",
					warnOnUnsupportedTypeScriptVersion: false,
					allowImportExportEverywhere: false
				},
				rules: getRules(id)
			}
		});
	});
});
