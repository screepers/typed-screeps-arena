declare module "game/prototypes" {
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
}
