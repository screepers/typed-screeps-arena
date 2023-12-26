/// <reference path="prototypes/index.d.ts" />
/// <reference path="constants.d.ts" />

declare module "arena" {
  export * from "arena/prototypes";
  export * from "arena/constants";
}

declare module "arena/season_alpha/capture_the_flag/basic" {
  export {Flag} from "arena/prototypes";
}

declare module "arena/season_alpha/capture_the_flag/advanced" {
  export {Flag} from "arena/prototypes";
}

declare module "arena/season_alpha/collect_and_control/basic" {
  export {AreaEffect, ScoreCollector} from "arena/prototypes";
}

declare module "arena/season_alpha/collect_and_control/basic/constants" {
  export {EFFECT_FREEZE, RESOURCE_SCORE} from "arena/constants";
}

declare module "arena/season_alpha/collect_and_control/advanced" {
  export {AreaEffect, ScoreCollector} from "arena/prototypes";
}

declare module "arena/season_alpha/collect_and_control/advanced/constants" {
  export {EFFECT_DAMAGE, EFFECT_FREEZE, RESOURCE_SCORE_X, RESOURCE_SCORE_Y, RESOURCE_SCORE_Z} from "arena/constants";
}
