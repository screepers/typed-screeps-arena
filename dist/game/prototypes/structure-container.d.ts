  import type { OwnedStructure, Store, _Constructor, _ConstructorById } from "../prototypes";
import { ResourceConstant } from "../constants";
  export type STRUCTURE_CONTAINER = "container";
  // export const STRUCTURE_CONTAINER: STRUCTURE_CONTAINER;
  export interface StructureContainer extends OwnedStructure<STRUCTURE_CONTAINER> {
    /**
     * A Store object that contains a cargo of this structure. Spawns can contain only energy.
     */
    store: Store<ResourceConstant>;
  }
  interface StructureContainerConstructor
    extends _Constructor<StructureContainer>,
      _ConstructorById<StructureContainer> {}

  export const StructureContainer: StructureContainerConstructor;
