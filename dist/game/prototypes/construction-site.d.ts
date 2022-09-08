declare module "game/prototypes" {
  import {
    BuildableStructure,
    ERR_NOT_OWNER,
    OK,
    STRUCTURE_PROTOTYPES,
  } from "game/constants";
  export interface ConstructionSite<
    T extends BuildableStructure = BuildableStructure
  > extends GameObject {
    readonly prototype: ConstructionSite<T>;

    /**
     * The current construction progress.
     */
    progress: number;
    /**
     * The total construction progress needed for the structure to be built.
     */
    progressTotal: number;

    /**
     * One of the STRUCTURE_PROTOTYPES entries
     */
    structurePrototypeName: string;

    /**
     * The structure that was built (when the construction site is completed)
     * You can check what structure is being constructed using the instanceof operator:
     */
    structure: T;

    /**
     * Whether it is your construction site.
     */
    my: boolean;

    remove(): ERR_NOT_OWNER | OK;
  }

  interface ConstructionSiteConstructor
    extends _Constructor<ConstructionSite>,
      _ConstructorById<ConstructionSite> {}

  export const ConstructionSite: ConstructionSiteConstructor;
}
