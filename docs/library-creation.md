# Library Creation

> **NOTE**: Remember to replace all occurrences of "XXX" with the library name

## Use nx to create a new library:

```
nx g @nrwl/angular:library --name=kendo-XXX --publishable --tags=scope:layout,type:ui --unitTestRunner=jest --importPath=@hash-code/kendo-XXX --strict --linter=eslint --compilationMode=partial --skipModule --viewEncapsulation=Emulated --style=scss --no-interactive --dry-run
```

## Update project.json

- add "updateBuildableProjectDepsInPackageJson": false to targets:build:configurations:production
- add deploy target

```json
    "deploy": {
      "executor": "ngx-deploy-npm:deploy",
      "dependsOn": [
        "^deploy"
      ],
      "options": {
        "access": "public",
        "buildTarget": "production"
      }
    },
```

## Update package.json

- add metadata and set correct peerDependencies/dependencies

```json
{
  "name": "@hash-code/XXX",
  "version": "0.0.0",
  "description": "ADD_DESCRIPTION",
  "repository": {
    "type": "git",
    "url": "https://github.com/hash-code-io/kendo-wrappers.git"
  },
  "keywords": [
    "Angular",
    "Kendo",
    "Kendo-Ui",
    "Wrapper",
    "Progress"
  ],
  "author": "HashCode",
  "license": "MIT",
  "homepage": "https://hash-code.io",
  "peerDependencies": {
    "@angular/common": "^14.0.0",
    "@angular/core": "^14.0.0",
    "rxjs": "^7.5.0"
  },
  "dependencies": {
    "tslib": "^2.3.0"
  }
}

```

## Add an example to example-app
