import {
  Creep,
  OwnedStructure,
  Structure,
  StructureRampart,
  StructureTower
} from "game/prototypes";
import { Flag, RESOURCE_SCORE, ScoreCollector, AreaEffect } from "arena";
import { constants, pathFinder, prototypes, utils } from "game";
import {
  createConstructionSite,
  getObjectsByPrototype,
  getTime,
  findInRange,
  findPath,
  findClosestByPath
} from "game/utils";
import { CostMatrix } from "game/path-finder";
import { RESOURCE_ENERGY } from "game/constants";
import { EFFECT_DAMAGE, EFFECT_FREEZE, RESOURCE_SCORE_X, RESOURCE_SCORE_Y, RESOURCE_SCORE_Z } from "arena/constants";

export function loop(): void {
  // console.log(`The time is ${getTime()}`);

  const attack = constants.ATTACK;

  const costMatrix = new CostMatrix();

  const noUtilsCreeps = getObjectsByPrototype(Creep).filter(i => i.my);

  // $ExpectType StructureContainer[]
  const containers = utils.getObjectsByPrototype(prototypes.StructureContainer);

  // $ExpectType StructureContainer[]
  const extensions = utils.getObjectsByPrototype(prototypes.StructureContainer);

  // $ExpectType Creep[]
  const myCreeps = utils
    .getObjectsByPrototype(prototypes.Creep)
    .filter(i => i.my);

  // $ExpectType Creep[]
  const enemyCreeps = utils
    .getObjectsByPrototype(prototypes.Creep)
    .filter(i => !i.my);
  const enemyFlag = utils.getObjectsByPrototype(Flag).find(i => !i.my); // $ExpectType Flag | undefined

  const structures = utils.getObjectsByPrototype(Structure); //// $ExpectType Structure[]
  const ownedStructures = utils.getObjectsByPrototype(OwnedStructure); //// $ExpectType OwnedStructure[]

  const noUtilStructures = getObjectsByPrototype(Structure); //// $ExpectType Structure[]
  const noUtilOwnedStructures = getObjectsByPrototype(OwnedStructure); //// $ExpectType OwnedStructure[]

  // verification that getObjectById works.
  const creepForId = myCreeps[0];
  if (creepForId) {
    const creepFromGetObjectById = utils.getObjectById(creepForId.id);
  }
  // TODO: creep actions

  // verification of Store object
  const myTower = utils.getObjectsByPrototype(StructureTower).find(i => i.my);
  if (myTower) {
    const energyStored = myTower.store[RESOURCE_ENERGY];
    const maxCapacity = myTower.store.getCapacity(RESOURCE_ENERGY);

    // $ExpectType Creep | null
    const findClosestByRange = myTower.findClosestByRange(
      getObjectsByPrototype(Creep).filter(i => !i.my)
    );

    const findInRangeResult = myTower.findInRange(enemyCreeps, 1); // $ExpectType Creep[]
    const findPathToResult = myTower.findPathTo(findInRangeResult[0]); // $ExpectType PathStep[]
    // TODO: findPathTo with options
    const findClosestByPathResult = myTower.findClosestByPath(enemyCreeps); // $ExpectType Creep | null
    // TODO: findClosestByPath with options

    // testing utils
    const utilsFindInRangeResult = findInRange(myTower, enemyCreeps, 1); // $ExpectType Creep[]
    const utilsFindPathToResult = findPath(myTower, utilsFindInRangeResult[0]); // $ExpectType PathStep[]
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

  // verification of arena score
  const scoreTestCreep = utils.getObjectsByPrototype(Creep).find(i => i.my);
  const scoreCollector = utils.getObjectsByPrototype(ScoreCollector)[0];
  if (scoreTestCreep && scoreCollector) {
    const scoreStored = scoreTestCreep.store[RESOURCE_SCORE];
    scoreTestCreep.transfer(scoreCollector, RESOURCE_SCORE);

    // $ExpectType boolean
    const inControl = scoreCollector.my;

    scoreTestCreep.transfer(scoreCollector, RESOURCE_SCORE_X);
    scoreTestCreep.transfer(scoreCollector, RESOURCE_SCORE_Y);
    scoreTestCreep.transfer(scoreCollector, RESOURCE_SCORE_Z);
  }

  // $ExpectType AreaEffect[]
  const areaEffects = utils.getObjectsByPrototype(AreaEffect);
  const freezeEffects = areaEffects.filter(x => x.effect === EFFECT_FREEZE);
  const damageEffects = areaEffects.filter(x => x.effect === EFFECT_DAMAGE);

  // build a rampart
  createConstructionSite(10, 10, StructureRampart);
  createConstructionSite(10, 10, prototypes.StructureRampart);
  // TODO: verify all buildable structure types
  // TODO: cSites .structure property.

  // TODO: test utils findXXX methods, theese methods are used by other metods.
}
