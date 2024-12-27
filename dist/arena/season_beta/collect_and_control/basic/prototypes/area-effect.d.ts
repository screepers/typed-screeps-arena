declare module "arena/season_beta/collect_and_control/basic/prototypes" {
  import { GameObject, _Constructor } from "game/prototypes";
  import {
    EFFECT_DAMAGE,
    EFFECT_FREEZE,
    EFFECT_HEAL,
  } from "arena/season_beta/collect_and_control/basic/constants";

  type AreaEffectType =
    | typeof EFFECT_FREEZE
    | typeof EFFECT_DAMAGE
    | typeof EFFECT_HEAL;

  /** An object that applies an effect of the specified type to all creeps at the same time */
  export interface AreaEffect extends GameObject {
    /**
     * The type of the effect this has on creep. "freeze" or "damage".
     */
    effect: AreaEffectType;
    /**
     * The amount of game ticks when this effect will disappear. (undocumented)
     */
    ticksToDecay?: number;
  }

  export const AreaEffect: _Constructor<AreaEffect>;
}
