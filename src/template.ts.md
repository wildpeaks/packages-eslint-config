# ESLint Config: %%title%%

![Github Release](https://img.shields.io/github/v/release/wildpeaks/packages-eslint-config.svg?label=Release&logo=github&logoColor=eceff4&colorA=4c566a&colorB=11abfb)

%%description%%


---
## Quickstart

Install the config:

	npm install %%name%% --save-dev

Reference it in your `package.json`:
````json
{
  "eslintConfig": {
    "extends": "%%name%%",
    "parserOptions": {
      "project": "./example.tsconfig.json"
    }
  }
}
````

or in `.eslintrc.json`:
````json
{
  "extends": "%%name%%",
  "parserOptions": {
    "project": "./example.tsconfig.json"
  }
}
````

---
## Typescript

The following tsconfig is recommended:
````json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "useDefineForClassFields": true,

    "moduleResolution": "node",
    "lib": ["es2020", "dom"],
    "module": "es2020",
    "target": "es2017",

    // "jsx": "react-jsx",
    // "jsxImportSource": "preact",

    //...
  }
}
````


---
## Prettier

This configuration is compatible with the following Prettier settings:

````json
{
  "printWidth": 120,
  "tabWidth": 4,
  "useTabs": true,
  "bracketSpacing": false,
  "trailingComma": "none"
}
````
