declare module "arena/season_beta/capture_the_flag/basic/prototypes" {
  import { GameObject, _Constructor, _ConstructorById } from "game/prototypes";

  /** A flag is a key game object for this arena. Capture all flags to win the game */
  export interface Flag extends GameObject {
    readonly prototype: Flag;
    /**
     * Equals to true or false if the flag is owned.
     * Returns undefined if it is neutral.
     */
    my?: boolean;
  }

  interface FlagConstructor
    extends _Constructor<Flag>,
      _ConstructorById<Flag> {}

  export const Flag: FlagConstructor;
}
