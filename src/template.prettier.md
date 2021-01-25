# Prettier Config

![Github Release](https://img.shields.io/github/v/release/wildpeaks/packages-eslint-config.svg?label=Release&logo=github&logoColor=eceff4&colorA=4c566a&colorB=11abfb)

**Shared settings for Prettier.**


---
## Quickstart

Install the config:

	npm install %%name%% --save-dev

Reference it in your `package.json`:
````json
{
  "prettier": "%%name%%"
}
````

or in `.prettierrc`:
````json
"%%name%%"
````

---
## Eslint

This is compatible with the following Eslint configs:
 - [@wildpeaks/legacy](https://www.npmjs.com/package/@wildpeaks/eslint-config-legacy) for ES5 Javascript projects without modules
 - [@wildpeaks/commonjs](https://www.npmjs.com/package/@wildpeaks/eslint-config-commonjs) for ES2018 Javascript projects using CommonJS modules
 - [@wildpeaks/typescript](https://www.npmjs.com/package/@wildpeaks/eslint-config-typescript) for ES2020 Typescript projects using ES Modules

