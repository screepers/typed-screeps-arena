declare module "game/prototypes" {
  import type { ResourceConstant } from "game/constants";

  /** A dropped piece of resource. Dropped resource pile decays for ceil(amount/1000) units per tick */
  export interface Resource extends GameObject {
    readonly prototype: Resource;
    /**
     * The amount of dropped resource
     */
    amount: number;
    /**
     * The type of dropped resource (one of RESOURCE_* constants)
     */
    resourceType: ResourceConstant;
  }

  export const Resource: _Constructor<Resource>;
}
