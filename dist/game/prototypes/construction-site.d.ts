declare module "game/prototypes" {
  import { BuildableStructure } from "game/constants";

  /**
   * A site of a structure which is currently under construction
   */
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
    /**
     * Remove this construction site
     */
    remove(): void;
  }

  interface ConstructionSiteConstructor
    extends _Constructor<ConstructionSite>,
      _ConstructorById<ConstructionSite> {}

  export const ConstructionSite: ConstructionSiteConstructor;
}
