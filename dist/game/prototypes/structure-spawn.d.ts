declare module "game/prototypes" {
  import {
    BodyPartConstant,
    ERR_BUSY,
    ERR_INVALID_ARGS,
    ERR_NOT_ENOUGH_ENERGY,
    ResourceConstant,
  } from "game/constants";
  import { Creep, Store } from "game/prototypes";

  export interface Spawning {
    needTime: number;
    remainingTime: number;
    creep: Creep;
  }

  export type STRUCTURE_SPAWN = "spawn";
  // export const STRUCTURE_SPAWN: STRUCTURE_SPAWN;
  export interface StructureSpawn extends OwnedStructure<STRUCTURE_SPAWN> {
    /**
     * A Store object that contains a cargo of this structure. Spawns can contain only energy.
     */
    store: Store<ResourceConstant>;
    /**
     * Start the creep spawning process. The required energy amount can be withdrawn from all spawns and extensions in the room.
     * @returns A creep on success or an errorcode on failure
     */
    spawnCreep(body: BodyPartConstant[]): {
      object?: Creep;
      error?: ERR_BUSY | ERR_INVALID_ARGS | ERR_NOT_ENOUGH_ENERGY;
    };
    spawning: Spawning | null;
  }
  interface StructureSpawnConstructor
    extends _Constructor<StructureSpawn>,
      _ConstructorById<StructureSpawn> {}

  export const StructureSpawn: StructureSpawnConstructor;
}
