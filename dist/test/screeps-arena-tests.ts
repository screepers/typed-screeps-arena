import {
  Creep,
  OwnedStructure,
  Structure,
  StructureRampart,
  StructureTower,
  StructureSpawn,
} from "game/prototypes";
import { constants, pathFinder, prototypes } from "game";
import {
  createConstructionSite,
  getObjectsByPrototype,
  getTicks,
  findInRange,
  findPath,
  findClosestByPath,
  getObjectById,
  getTerrainAt,
} from "game/utils";
import { CostMatrix } from "game/path-finder";
import { RESOURCE_ENERGY } from "game/constants";
import { Flag } from "arena/season_beta/capture_the_flag/basic/prototypes";
import {
  ScoreCollector,
  AreaEffect,
} from "arena/season_beta/collect_and_control/basic/prototypes";
import {
  EFFECT_DAMAGE,
  EFFECT_FREEZE,
  RESOURCE_SCORE,
} from "arena/season_beta/collect_and_control/basic/constants";
import {
  RESOURCE_SCORE_X,
  RESOURCE_SCORE_Y,
  RESOURCE_SCORE_Z,
} from "arena/season_beta/collect_and_control/advanced/constants";
import { Visual } from "game/visual";

export function loop(): void {
  const ticks = getTicks();

  const attack = constants.ATTACK;
  const carry = constants.CARRY;
  const move = constants.MOVE;
  const work = constants.WORK;
  const tough = constants.TOUGH;
  const rangedAttack = constants.RANGED_ATTACK;
  const heal = constants.HEAL;

  const costMatrix = new CostMatrix();

  const terrain = getTerrainAt({ x: 0, y: 0 });

  switch (terrain) {
    case constants.TERRAIN_PLAIN:
      break;
    case constants.TERRAIN_WALL:
      break;
    case constants.TERRAIN_SWAMP:
      break;
  }

  const noUtilsCreeps = getObjectsByPrototype(Creep).filter((i) => i.my);

  // $ExpectType StructureContainer[]
  const containers = getObjectsByPrototype(prototypes.StructureContainer);

  // $ExpectType StructureContainer[]
  const extensions = getObjectsByPrototype(prototypes.StructureContainer);

  // $ExpectType Creep[]
  const myCreeps = getObjectsByPrototype(prototypes.Creep).filter((i) => i.my);

  // $ExpectType Creep[]
  const enemyCreeps = getObjectsByPrototype(prototypes.Creep).filter(
    (i) => !i.my
  );
  const enemyFlag = getObjectsByPrototype(Flag).find((i) => !i.my); // $ExpectType Flag | undefined

  const structures = getObjectsByPrototype(Structure); //// $ExpectType Structure[]
  const ownedStructures = getObjectsByPrototype(OwnedStructure); //// $ExpectType OwnedStructure[]

  const noUtilStructures = getObjectsByPrototype(Structure); //// $ExpectType Structure[]
  const noUtilOwnedStructures = getObjectsByPrototype(OwnedStructure); //// $ExpectType OwnedStructure[]

  // verification that getObjectById works.
  const creepForId = myCreeps[0];
  if (creepForId) {
    const creepFromGetObjectById = getObjectById(creepForId.id);
  }
  // TODO: creep actions

  // verification of Store object
  const myTower = getObjectsByPrototype(StructureTower).find((i) => i.my);
  if (myTower) {
    const energyStored = myTower.store[RESOURCE_ENERGY];
    const maxCapacity = myTower.store.getCapacity(RESOURCE_ENERGY);

    // $ExpectType Creep | null
    const findClosestByRange = myTower.findClosestByRange(
      getObjectsByPrototype(Creep).filter((i) => !i.my)
    );

    const findInRangeResult = myTower.findInRange(enemyCreeps, 1); // $ExpectType Creep[]
    const findPathToResult = myTower.findPathTo(findInRangeResult[0]); // $ExpectType Position[]
    // TODO: findPathTo with options
    const findClosestByPathResult = myTower.findClosestByPath(enemyCreeps); // $ExpectType Creep | null
    // TODO: findClosestByPath with options

    // testing utils
    const utilsFindInRangeResult = findInRange(myTower, enemyCreeps, 1); // $ExpectType Creep[]
    const utilsFindPathToResult = findPath(myTower, utilsFindInRangeResult[0]); // $ExpectType Position[]
    // TODO: findPathTo with options
    // $ExpectType Creep
    const utilsFindClosestByPathResult = findClosestByPath(
      myTower,
      enemyCreeps
    );
    // TODO: findClosestByPath with options

    if (enemyFlag) {
      const positions: Array<Creep | Flag> = [...enemyCreeps, enemyFlag];
      // $ExpectType (Creep | Flag)[]
      const findInRangeMultipleTypesOfPositions = myTower.findInRange(
        positions,
        1
      );
    }
  }

  // verification of Spawn object
  const mySpawn = getObjectsByPrototype(StructureSpawn).find((i) => i.my);
  if (mySpawn) {
    const energyStored = mySpawn.store[RESOURCE_ENERGY];
    const maxCapacity = mySpawn.store.getCapacity(RESOURCE_ENERGY);

    const spawnResult = mySpawn.spawnCreep([work, move, carry]);
    if (spawnResult.object) {
      // $ExpectType Creep
      const creepBeingSpawned = spawnResult.object;
    }

    const spawning = mySpawn.spawning;
    if (spawning) {
      // $ExpectType Creep
      const creepBeingSpawned = spawning.creep;
      // $ExpectType number
      const remainingTime = spawning.remainingTime;
      // $ExpectType number
      const needTime = spawning.needTime;
      spawning.cancel();
    }
  }

  // verification of arena score
  const scoreTestCreep = getObjectsByPrototype(Creep).find((i) => i.my);
  const scoreCollector = getObjectsByPrototype(ScoreCollector)[0];
  if (scoreTestCreep && scoreCollector) {
    // $ExpectType boolean
    const inControl = scoreCollector.my;

    const scoreTypes = [
      RESOURCE_SCORE,
      RESOURCE_SCORE_X,
      RESOURCE_SCORE_Y,
      RESOURCE_SCORE_Z,
      scoreCollector.resourceType,
    ];
    for (const scoreType of scoreTypes) {
      const scoreStored = scoreTestCreep.store[scoreType];
      scoreTestCreep.transfer(scoreCollector, scoreType);
    }
  }

  // $ExpectType AreaEffect[]
  const areaEffects = getObjectsByPrototype(AreaEffect);
  const freezeEffects = areaEffects.filter((x) => x.effect === EFFECT_FREEZE);
  const damageEffects = areaEffects.filter((x) => x.effect === EFFECT_DAMAGE);

  // build a rampart
  const rampart1 = createConstructionSite(10, 10, StructureRampart);
  const rampart2 = createConstructionSite(10, 10, prototypes.StructureRampart);
  rampart2.object?.structure; // $ExpectType StructureRampart | undefined
  // TODO: verify all buildable structure types

  const tower = createConstructionSite(10, 10, StructureTower);
  tower.object?.structure; // $ExpectType StructureTower | undefined
  tower.object?.structure.attack(enemyCreeps[0]);

  // overload of createConstructionSite
  createConstructionSite({ x: 10, y: 10 }, StructureRampart);
  if (myTower) {
    createConstructionSite(myTower, StructureRampart);
  }

  // TODO: test utils findXXX methods, theese methods are used by other metods.

  // Visuals
  const layer10Persistant = new Visual(10, true);
  layer10Persistant.clear().text(
    "100",
    { x: 25, y: 25 - 0.5 }, // above the creep
    {
      font: "0.5",
      opacity: 0.7,
      backgroundColor: "#808080",
      backgroundPadding: 0.03,
    }
  );
}
