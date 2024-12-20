# DefinitelyTyped

### TODO

- [ ] Publish `@types/screeps-arena` on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

### How to push updates to `@types/screeps-arena` on DefinitelyTyped

- Fork DefinitelyTyped
- Partial clone DefinitelyTyped, the repo is huge.

  https://github.com/DefinitelyTyped/DefinitelyTyped#partial-clone

  ```
  git clone --sparse --filter=blob:none --depth=1 <forkedUrl>
  git sparse-checkout add types/screeps-arena
  ```

- create a branch named `screeps-arena-v[major].[minor].[patch]`
- copy the `*.d.ts` files as well as any tests into `types/screeps-arena`
- commit the update to your branch
- create a PR from your updated branch to master on DefinitelyTyped
- follow the feedback `typescript-bot` gives you.

### Future README Installation Instructions

The type definitions are published on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). To install them, run the following.

```bash
# npm
npm install @types/screeps-arena --save-dev

# yarn
yarn add @types/screeps-arena
```
