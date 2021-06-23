// this needs to exist in /game and not as index in /game/prototypes, else vscode can't find it
export * from "./prototypes/construction-site";
export * from "./prototypes/creep";
export * from "./prototypes/game-object";
export * from "./prototypes/owned-structure";
export * from "./prototypes/resource";
export * from "./prototypes/source";
export * from "./prototypes/store";
export * from "./prototypes/structure-container";
export * from "./prototypes/structure-extension";
export * from "./prototypes/structure-rampart";
export * from "./prototypes/structure-road";
export * from "./prototypes/structure-spawn";
export * from "./prototypes/structure-tower";
export * from "./prototypes/structure-wall";
export * from "./prototypes/structure";

export interface _Constructor<T> {
  readonly prototype: T;
  new (): T;
  (): T;
}
export interface _ConstructorById<T> extends _Constructor<T> {
  new (id: Id<T>): T;
  (id: Id<T>): T;
}

export namespace Tag {
  const OpaqueTagSymbol: unique symbol;

  export class OpaqueTag<T> {
    private [OpaqueTagSymbol]: T;
  }
}

export type Id<T> = string & Tag.OpaqueTag<T>;

export interface RoomPosition {
  /**
   * X position in the room. Can be undefined if `.exists` is false
   */
  x: number /* | undefined;*/;
  /**
   * Y position in the room. Can be undefined if `.exists` is false
   */
  y: number /* | undefined;*/;
}
