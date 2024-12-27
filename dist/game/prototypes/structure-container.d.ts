declare module "game/prototypes" {
  import { ResourceConstant } from "game/constants";

  export type STRUCTURE_CONTAINER = "container";
  // export const STRUCTURE_CONTAINER: STRUCTURE_CONTAINER;

  /**
   * A small container that can be used to store resources.
   * This is a walkable structure.
   * All dropped resources automatically goes to the container at the same tile.
   */
  export interface StructureContainer
    extends OwnedStructure<STRUCTURE_CONTAINER> {
    /**
     * A Store object that contains a cargo of this structure. Spawns can contain only energy.
     */
    store: Store<ResourceConstant>;
  }

  interface StructureContainerConstructor
    extends _Constructor<StructureContainer>,
      _ConstructorById<StructureContainer> {}

  export const StructureContainer: StructureContainerConstructor;
}
