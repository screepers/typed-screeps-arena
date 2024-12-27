declare module "game/prototypes" {
  export type STRUCTURE_RAMPART = "rampart";
  // export const STRUCTURE_RAMPART: STRUCTURE_RAMPART;

  /** Blocks movement of hostile creeps, and defends your creeps and structures on the same position. */
  export interface StructureRampart extends OwnedStructure<STRUCTURE_RAMPART> {}

  interface StructureRampartConstructor
    extends _Constructor<StructureRampart>,
      _ConstructorById<StructureRampart> {}

  export const StructureRampart: StructureRampartConstructor;
}
