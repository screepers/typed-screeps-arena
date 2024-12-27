declare module "game/prototypes" {
  import { ResourceConstant } from "game/constants";

  export type STRUCTURE_EXTENSION = "extension";
  // export const STRUCTURE_EXTENSION: STRUCTURE_EXTENSION;

  /** Contains energy that can be spent on spawning bigger creeps */
  export interface StructureExtension
    extends OwnedStructure<STRUCTURE_EXTENSION> {
    /**
     * A Store object that contains a cargo of this structure. Spawns can contain only energy.
     */
    store: Store<ResourceConstant>;
  }

  interface StructureExtensionConstructor
    extends _Constructor<StructureExtension>,
      _ConstructorById<StructureExtension> {}

  export const StructureExtension: StructureExtensionConstructor;
}
