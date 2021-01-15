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
