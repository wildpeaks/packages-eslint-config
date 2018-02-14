module.exports = {"env":{"node":false,"browser":false,"commonjs":false,"es6":true},"parserOptions":{"ecmaVersion":2017,"ecmaFeatures":{"arrowFunctions":true,"templateStrings":true},"sourceType":"module","allowImportExportEverywhere":false},"plugins":[],"rules":{"for-direction":"error","getter-return":"error","no-await-in-loop":"error","no-compare-neg-zero":"error","no-cond-assign":["error","always"],"no-console":"off","no-constant-condition":"error","no-control-regex":"error","no-debugger":"error","no-dupe-args":"error","no-dupe-keys":"error","no-duplicate-case":"error","no-empty":"error","no-empty-character-class":"error","no-ex-assign":"error","no-extra-boolean-cast":"error","no-extra-parens":"off","no-extra-semi":"warn","no-func-assign":"error","no-inner-declarations":"error","no-invalid-regexp":"error","no-irregular-whitespace":["error",{"skipStrings":true,"skipComments":true,"skipRegExps":true,"skipTemplates":true}],"no-obj-calls":"error","no-prototype-builtins":"error","no-regex-spaces":"warn","no-sparse-arrays":"error","no-template-curly-in-string":"error","no-unexpected-multiline":"error","no-unreachable":"error","no-unsafe-finally":"error","no-unsafe-negation":"error","use-isnan":"error","valid-jsdoc":"off","valid-typeof":"error","accessor-pairs":["error",{"setWithoutGet":true,"getWithoutSet":false}],"array-callback-return":"error","block-scoped-var":"error","class-methods-use-this":"error","complexity":"off","consistent-return":"error","curly":"error","default-case":"off","dot-location":["error","property"],"dot-notation":["error"],"eqeqeq":"error","guard-for-in":"off","no-alert":"error","no-caller":"error","no-case-declarations":"error","no-div-regex":"error","no-else-return":"error","no-empty-function":"warn","no-empty-pattern":"error","no-eq-null":"error","no-eval":"error","no-extend-native":"error","no-extra-bind":"error","no-extra-label":"off","no-fallthrough":"error","no-floating-decimal":"error","no-global-assign":"error","no-implicit-coercion":"error","no-implicit-globals":"off","no-implied-eval":"error","no-invalid-this":"error","no-iterator":"error","no-labels":"error","no-lone-blocks":"error","no-loop-func":"error","no-magic-numbers":"off","no-multi-spaces":"error","no-multi-str":"error","no-new":"error","no-new-func":"off","no-new-wrappers":"error","no-octal":"error","no-octal-escape":"error","no-param-reassign":"error","no-proto":"error","no-redeclare":"error","no-restricted-properties":"off","no-return-assign":"error","no-return-await":"error","no-script-url":"error","no-self-assign":"error","no-self-compare":"error","no-sequences":"error","no-throw-literal":"error","no-unmodified-loop-condition":"error","no-unused-expressions":"warn","no-unused-labels":"off","no-useless-call":"warn","no-useless-concat":"error","no-useless-escape":"warn","no-useless-return":"error","no-void":"error","no-warning-comments":["warn",{"terms":["todo","todelete","uncomment"],"location":"anywhere"}],"no-with":"error","prefer-promise-reject-errors":"off","radix":"error","require-await":"error","vars-on-top":"off","wrap-iife":["error","any"],"yoda":["error","never"],"strict":[2,"global"],"init-declarations":"off","no-catch-shadow":"error","no-delete-var":"error","no-label-var":"off","no-restricted-globals":"off","no-shadow":["error",{"builtinGlobals":true,"hoist":"all"}],"no-shadow-restricted-names":"error","no-undef":"error","no-undef-init":"error","no-undefined":"error","no-unused-vars":"error","no-use-before-define":["error",{"functions":false,"classes":true}],"callback-return":"off","global-require":"error","handle-callback-err":"warn","no-buffer-constructor":"error","no-mixed-requires":"off","no-new-require":"error","no-path-concat":"error","no-process-env":"warn","no-process-exit":"error","no-restricted-modules":"off","no-sync":"error","array-bracket-newline":["error","consistent"],"array-bracket-spacing":["error","never"],"array-element-newline":"off","block-spacing":["error","never"],"brace-style":[2,"1tbs",{"allowSingleLine":false}],"camelcase":"off","capitalized-comments":"off","comma-dangle":["error","never"],"comma-spacing":["error",{"before":false,"after":true}],"comma-style":["error","last"],"computed-property-spacing":["error","never"],"consistent-this":["error","self"],"eol-last":["error"],"func-call-spacing":["error","never"],"func-name-matching":"off","func-names":"off","func-style":["error","declaration",{"allowArrowFunctions":true}],"function-paren-newline":["error","consistent"],"id-blacklist":"off","id-length":"off","id-match":"off","indent":["error","tab",{"SwitchCase":1,"MemberExpression":"off"}],"jsx-quotes":["error","prefer-double"],"key-spacing":["error",{"beforeColon":false,"afterColon":true}],"line-comment-position":"off","keyword-spacing":"off","linebreak-style":["error","unix"],"lines-around-comment":"off","lines-between-class-members":"off","max-depth":["error",{"max":8}],"max-len":[1,240,4,{"ignoreComments":true,"ignoreUrls":true}],"max-lines":[0],"max-nested-callbacks":["error",5],"max-params":["error",10],"max-statements":["error",100],"max-statements-per-line":["error",{"max":1}],"multiline-comment-style":"off","multiline-ternary":["error","never"],"new-cap":["error",{"newIsCap":true,"capIsNew":true}],"new-parens":"error","newline-per-chained-call":["error",{"ignoreChainWithDepth":5}],"no-array-constructor":"error","no-bitwise":"error","no-continue":"error","no-inline-comments":"off","no-lonely-if":"error","no-mixed-operators":"error","no-mixed-spaces-and-tabs":"error","no-multi-assign":"error","no-multiple-empty-lines":["error",{"max":2,"maxEOF":1,"maxBOF":1}],"no-negated-condition":"off","no-nested-ternary":"error","no-new-object":"error","no-plusplus":"off","no-tabs":"off","no-ternary":"off","no-trailing-spaces":"error","no-underscore-dangle":"error","no-unneeded-ternary":"error","no-whitespace-before-property":"error","nonblock-statement-body-position":"off","object-curly-newline":"off","object-curly-spacing":"off","object-property-newline":"off","one-var":["error","never"],"one-var-declaration-per-line":["error","always"],"operator-assignment":["error","always"],"operator-linebreak":["error","before"],"padded-blocks":"off","padding-line-between-statements":"off","quote-props":["error","consistent-as-needed"],"quotes":[2,"single",{"allowTemplateLiterals":true}],"require-jsdoc":"off","semi":["error","always"],"semi-spacing":["error",{"before":false,"after":true}],"semi-style":["error","last"],"sort-keys":"off","sort-vars":"off","space-before-blocks":["error",{"functions":"never","keywords":"never","classes":"always"}],"space-before-function-paren":["error","never"],"space-in-parens":["error","never"],"space-infix-ops":"error","space-unary-ops":["error",{"words":true,"nonwords":false}],"spaced-comment":"off","switch-colon-spacing":"error","template-tag-spacing":["error","always"],"unicode-bom":"error","wrap-regex":"off","arrow-body-style":["error","as-needed"],"arrow-parens":["error","as-needed"],"arrow-spacing":["error",{"before":true,"after":true}],"constructor-super":"error","generator-star-spacing":["error",{"before":false,"after":true}],"no-class-assign":"error","no-confusing-arrow":"error","no-const-assign":"error","no-dupe-class-members":"error","no-duplicate-imports":"error","no-new-symbol":"error","no-restricted-imports":"off","no-this-before-super":"error","no-useless-computed-key":"error","no-useless-constructor":"error","no-useless-rename":"error","no-var":"error","object-shorthand":"error","prefer-arrow-callback":"error","prefer-const":["error",{"destructuring":"all"}],"prefer-destructuring":["error",{"array":false,"object":true}],"prefer-numeric-literals":"error","prefer-rest-params":"error","prefer-spread":"error","prefer-template":"error","require-yield":"error","rest-spread-spacing":["error","never"],"sort-imports":"off","symbol-description":"error","template-curly-spacing":["error","never"],"yield-star-spacing":["error",{"before":false,"after":true}],"no-restricted-syntax":["error","WithStatement"]}};