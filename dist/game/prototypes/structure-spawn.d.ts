declare module "game/prototypes" {
  import {
    BodyPartConstant,
    ERR_BUSY,
    ERR_INVALID_ARGS,
    ERR_NOT_ENOUGH_ENERGY,
    ERR_NOT_OWNER,
    OK,
    ResourceConstant,
  } from "game/constants";
  import { Store } from "game/prototypes";

  /**
   * The result of the StructureSpawn.spawnCreep method.
   */
  export interface SpawnCreepResult {
    /**
     * The instance of the Creep being spawned
     */
    object?: Creep;
    /**
     * The error code
     */
    error?: ERR_NOT_OWNER | ERR_INVALID_ARGS | ERR_NOT_ENOUGH_ENERGY | ERR_BUSY;
  }

  /**
   * Details of the creep being spawned currently that can be addressed by the StructureSpawn.spawning property.
   */
  export interface Spawning {
    /**
     * Time needed in total to complete the spawning.
     */
    needTime: number;
    /**
     * Remaining time to go.
     */
    remainingTime: number;
    /**
     * The creep that being spawned.
     */
    creep: Creep;
    /**
     * Cancel spawning immediately. Energy spent on spawning is not returned.
     */
    cancel(): OK | ERR_NOT_OWNER;
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
     * @param body An array describing the new creep's body
     * @returns A creep on success or an error code on failure
     */
    spawnCreep(body: BodyPartConstant[]): SpawnCreepResult;
    /**
     * If the spawn is in process of spawning a new creep, this object will contain a Spawning object, or undefined otherwise.
     * CAUION: The document says "or null", but actually it returns undefined when not spawning.
     */
    spawning?: Spawning;
  }
  interface StructureSpawnConstructor
    extends _Constructor<StructureSpawn>,
      _ConstructorById<StructureSpawn> {}

  export const StructureSpawn: StructureSpawnConstructor;
}
