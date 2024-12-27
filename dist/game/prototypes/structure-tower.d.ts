declare module "game/prototypes" {
  import {
    ResourceConstant,
    TowerAttackResult,
    TowerHealResult,
  } from "game/constants";
  import { Store } from "game/prototypes";

  export type STRUCTURE_TOWER = "tower";
  // export const STRUCTURE_TOWER: STRUCTURE_TOWER;

  /** Remotely attacks game objects or heals creeps within its range */
  export interface StructureTower extends OwnedStructure<STRUCTURE_TOWER> {
    /**
     * A Store object that contains a cargo of this structure. Towers can contain only energy.
     */
    store: Store<ResourceConstant>;
    /**
     * 10-ticks cooldown for towers (Tower.cooldown). Exception: towers in CTF can shoot each tick.
     */
    cooldown: number;
    /**
     * Remotely attack any creep or structure.
     * The target has to be within 50 squares range of the tower.
     * Attack effectiveness	600 hits at range ≤5 to 150 hits at range ≥20
     */
    attack(target: Creep | Structure): TowerAttackResult;
    /**
     * Remotely heal any creep.
     * The target has to be within 50 squares range of the tower.
     * Heal effectiveness	400 hits at range ≤5 to 100 hits at range ≥20
     */
    heal(target: Creep): TowerHealResult;
  }

  interface StructureTowerConstructor
    extends _Constructor<StructureTower>,
      _ConstructorById<StructureTower> {}

  export const StructureTower: StructureTowerConstructor;
}
