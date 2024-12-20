# typed-screeps-arena

Typescript types for the game [Screeps Arena](https://store.steampowered.com/app/1137320/Screeps_Arena/) based on the official [Screeps Arena Docs](https://arena.screeps.com/docs/).

### Installation

Currently this package can be installed manually by following these steps:

1. Add the following entry to your `packages.json` dependencies:
```json
  "@types/screeps-arena": "screepers/typed-screeps-arena#season-beta"
```

2. Run `npm install` to install the package dependency changes.

3. Update your `tsconfig.json` to include the types from `node_modules/@types/screeps-arena/dist`:

```json
  "typeRoots": [
    "./node_modules/@types",
    "./src/@types",
    "./node_modules/@types/screeps-arena/dist",
  ]
```

### Updating types

- Delete `./node_modules/@types/screeps-arena` and `./package-lock.json` in your project.
- Run `npm install` to reinstall dependencies.
