module.exports = {"env":{"node":false,"browser":false,"commonjs":true,"es6":true},"parserOptions":{"ecmaVersion":2017,"ecmaFeatures":{"arrowFunctions":true,"templateStrings":true,"jsx":true,"experimentalObjectRestSpread":true}},"plugins":["react"],"rules":{"no-cond-assign":["error","always"],"no-console":"off","no-constant-condition":"error","no-control-regex":"error","no-debugger":"error","no-dupe-args":"error","no-dupe-keys":"error","no-duplicate-case":"error","no-empty":"error","no-empty-character-class":"error","no-ex-assign":"error","no-extra-boolean-cast":"error","no-extra-parens":"off","no-extra-semi":"warn","no-func-assign":"error","no-inner-declarations":"error","no-invalid-regexp":"error","no-irregular-whitespace":["error",{"skipStrings":true,"skipComments":true,"skipRegExps":true,"skipTemplates":true}],"no-negated-in-lhs":"error","no-obj-calls":"error","no-prototype-builtins":"error","no-regex-spaces":"warn","no-sparse-arrays":"error","no-unexpected-multiline":"error","no-unreachable":"error","no-unsafe-finally":"error","use-isnan":"error","valid-jsdoc":"off","valid-typeof":"error","accessor-pairs":["error",{"setWithoutGet":true,"getWithoutSet":false}],"array-callback-return":"error","block-scoped-var":"error","consistent-return":"error","curly":"error","default-case":"off","dot-location":["error","property"],"dot-notation":["error"],"eqeqeq":"error","guard-for-in":"off","no-alert":"error","no-caller":"error","no-case-declarations":"error","no-div-regex":"error","no-else-return":"error","no-empty-function":"warn","no-empty-pattern":"error","no-eval":"error","no-extend-native":"error","no-extra-bind":"error","no-fallthrough":"error","no-floating-decimal":"error","no-implicit-coercion":"error","no-implicit-globals":"off","no-implied-eval":"error","no-invalid-this":"error","no-iterator":"error","no-labels":"error","no-lone-blocks":"error","no-loop-func":"error","no-magic-numbers":"off","no-multi-spaces":"error","no-multi-str":"error","no-native-reassign":"error","no-new":"error","no-new-func":"off","no-new-wrappers":"error","no-octal":"error","no-octal-escape":"error","no-param-reassign":"error","no-proto":"error","no-redeclare":"error","no-return-assign":"error","no-script-url":"error","no-self-assign":"error","no-self-compare":"error","no-sequences":"error","no-throw-literal":"error","no-unmodified-loop-condition":"error","no-unused-expressions":"warn","no-useless-call":"warn","no-useless-concat":"error","no-useless-escape":"warn","no-void":"error","no-warning-comments":["warn",{"terms":["todo","todelete","uncomment"],"location":"anywhere"}],"no-with":"error","radix":"error","vars-on-top":"error","wrap-iife":["error","any"],"yoda":["error","never"],"strict":[2,"global"],"init-declarations":"off","no-catch-shadow":"error","no-delete-var":"error","no-shadow":["error",{"builtinGlobals":true,"hoist":"all"}],"no-shadow-restricted-names":"error","no-undef":"error","no-undef-init":"error","no-undefined":"error","no-unused-vars":"error","no-use-before-define":["error",{"functions":false,"classes":true}],"callback-return":"off","global-require":"error","handle-callback-err":"warn","no-mixed-requires":"off","no-new-require":"error","no-path-concat":"error","no-process-env":"warn","no-process-exit":"error","no-sync":"error","array-bracket-spacing":["error","never"],"block-spacing":["error","never"],"brace-style":[2,"1tbs",{"allowSingleLine":false}],"camelcase":"off","comma-dangle":["error","never"],"comma-spacing":["error",{"before":false,"after":true}],"comma-style":["error","last"],"computed-property-spacing":["error","never"],"consistent-this":["error","self"],"eol-last":["error"],"func-names":"off","func-style":["error","declaration",{"allowArrowFunctions":true}],"id-length":"off","id-match":"off","indent":["error","tab",{"SwitchCase":1,"MemberExpression":"off"}],"jsx-quotes":["error","prefer-double"],"key-spacing":["error",{"beforeColon":false,"afterColon":true}],"linebreak-style":["error","unix"],"lines-around-comment":"off","max-depth":["error",{"max":8}],"max-len":[1,120,4,{"ignoreComments":true,"ignoreUrls":true}],"max-lines":[0],"max-nested-callbacks":["error",5],"max-params":["error",10],"max-statements":["error",100],"max-statements-per-line":["error",{"max":1}],"new-cap":["error",{"newIsCap":true,"capIsNew":true}],"new-parens":"error","newline-after-var":"off","newline-before-return":"off","newline-per-chained-call":["error",{"ignoreChainWithDepth":5}],"no-array-constructor":"error","no-bitwise":"error","no-continue":"error","no-inline-comments":"off","no-lonely-if":"error","no-mixed-operators":"error","no-mixed-spaces-and-tabs":"error","no-multiple-empty-lines":["error",{"max":2,"maxEOF":1,"maxBOF":1}],"no-negated-condition":"off","no-nested-ternary":"error","no-new-object":"error","no-plusplus":"off","no-spaced-func":"error","no-ternary":"off","no-trailing-spaces":"error","no-underscore-dangle":"error","no-unneeded-ternary":"error","no-whitespace-before-property":"error","object-curly-newline":"off","object-curly-spacing":"off","object-property-newline":"off","one-var":["error","never"],"one-var-declaration-per-line":["error","always"],"operator-assignment":["error","always"],"operator-linebreak":["error","before"],"padded-blocks":"off","quote-props":["error","consistent-as-needed"],"quotes":[2,"single",{"allowTemplateLiterals":true}],"semi":["error","always"],"semi-spacing":["error",{"before":false,"after":true}],"sort-vars":"off","space-before-blocks":["error",{"functions":"never","keywords":"never","classes":"always"}],"space-before-function-paren":["error","never"],"space-in-parens":["error","never"],"space-infix-ops":"error","space-unary-ops":["error",{"words":true,"nonwords":false}],"spaced-comment":"off","unicode-bom":"error","wrap-regex":"off","arrow-body-style":["error","as-needed"],"arrow-parens":["error","as-needed"],"arrow-spacing":["error",{"before":true,"after":true}],"constructor-super":"error","generator-star-spacing":["error",{"before":false,"after":true}],"no-class-assign":"error","no-confusing-arrow":"error","no-const-assign":"error","no-dupe-class-members":"error","no-duplicate-imports":"error","no-new-symbol":"error","no-this-before-super":"error","no-useless-computed-key":"error","no-useless-constructor":"error","no-useless-rename":"error","no-var":"error","object-shorthand":"error","prefer-arrow-callback":"error","prefer-const":["error",{"destructuring":"all"}],"prefer-reflect":"off","prefer-rest-params":"error","prefer-spread":"error","prefer-template":"error","require-yield":"error","rest-spread-spacing":["error","never"],"sort-imports":"off","template-curly-spacing":["error","never"],"yield-star-spacing":["error",{"before":false,"after":true}],"no-return-await":"error","no-await-in-loop":"error","class-methods-use-this":"error","react/prop-types":["error",{"ignore":["children"]}],"no-restricted-syntax":["error","WithStatement","ImportDeclaration","ImportSpecifier","ImportDefaultSpecifier","ImportNamespaceSpecifier","ExportDefaultDeclaration","ExportNamedDeclaration","ExportAllDeclaration","ExportSpecifier"]},"extends":["plugin:react/recommended"],"globals":{"module":true}};