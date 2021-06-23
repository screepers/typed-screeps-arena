  import type { ERR_BUSY, ERR_INVALID_ARGS, ERR_NOT_ENOUGH_ENERGY } from "./constants";
  import type { Structure } from "./prototypes";

  export * as utils from "./utils";
  export * as pathFinder from "./path-finder";

  export * as prototypes from "./prototypes";

  export * as constants from "./constants";

  export const arenaInfo: {
    /**
     * "Capture the Flag"
     */
    name: string;
    level: number;
    /**
     * "alpha"
     */
    season: string;
  };

  export function createConstructionSite(x: number, y: number, structurePrototype: string /*STRUCTURE_PROTOTYPES*/):
  { object?: Structure; error?: ERR_BUSY | ERR_INVALID_ARGS | ERR_NOT_ENOUGH_ENERGY };
