---
sidebar_position: 3
---

# Configuration

Movie Studio is built with **Angular** and **TypeScript.js**

## Prerequisites 
- Knowledge of JavaScript
- HTML
- CSS
- Node.js (check your version of Node by running `node -v`) or [install Node](https://nodejs.org/en/)
- npm package manager (check that you have npm by running `npm -v`)

## Package.json

Follow Angular's documentation for installation and template guides [Angular official doc](https://angular.io/guide/setup-local).
#
If you follow along or decide to clone this repo from [GitHub](https://github.com/lekolawole/movieStudio-angular), run `npm i` to download the necessary dependencies.

```jsx title="dependencies"
"dependencies": {
    "@angular/animations": "^14.1.0",
    "@angular/cdk": "^14.1.0",
    "@angular/common": "^14.1.0",
    "@angular/compiler": "^14.1.0",
    "@angular/core": "^14.1.0",
    "@angular/forms": "^14.1.0",
    "@angular/material": "^14.1.0",
    "@angular/platform-browser": "^14.1.0",
    "@angular/platform-browser-dynamic": "^14.1.0",
    "@angular/router": "^14.1.0",
    "rxjs": "~7.5.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.11.4"
  },
```

```jsx title="devDependencies"
{
    "@angular-devkit/build-angular": "^14.1.0",
    "@angular/cli": "~14.1.0",
    "@angular/compiler-cli": "^14.1.0",
    "@types/jasmine": "~4.0.0",
    "angular-cli-ghpages": "^1.0.3",
    "jasmine-core": "~4.2.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.0.0",
    "typedoc": "^0.23.10",
    "typescript": "~4.7.2"
  }
```

## tsconfig.json

To learn more about this file see: [https://angular.io/config/tsconfig](https://angular.io/config/tsconfig).

```jsx title="tsconfig.json"
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2020",
    "module": "es2020",
    "lib": [
      "es2020",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```
