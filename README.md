# typed-screeps-arena

Typescript types for the game [Screeps Arena](https://store.steampowered.com/app/1137320/Screeps_Arena/) based on the official [Screeps Arena Docs](https://arena.screeps.com/docs/).

> [!NOTE]
> The types in this branch are for **Season Beta** in Screeps Arena.

### Installation

Currently this package can be installed manually by following these steps:

1. Add this entry to your `package.json` dependencies:
```json
  "@types/screeps-arena": "screepers/typed-screeps-arena#season-beta"
```

2. Run `npm install` (or `yarn install`) to install dependencies.

3. Update your `tsconfig.json` to include the types in `./node_modules/@types/screeps-arena/dist`:

```json
  "typeRoots": [
    "./node_modules/@types",
    "./src/@types",
    "./node_modules/@types/screeps-arena/dist",
  ]
```

### Updating types

To update the types installed manually:

1. Delete `./node_modules/@types/screeps-arena` and `package-lock.json` (or `yarn.lock`).

2. Run `npm install` (or `yarn install`) to reinstall dependencies.
