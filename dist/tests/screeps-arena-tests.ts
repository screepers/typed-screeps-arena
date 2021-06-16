import {
  Creep,
  OwnedStructure,
  Structure,
  StructureRampart,
  StructureTower
} from "game/prototypes";
import { constants, pathFinder, prototypes, utils } from "game";
import {
  createConstructionSite,
  getObjectsByPrototype,
  getTime
} from "game/utils";
import { CostMatrix } from "game/path-finder";
import { RESOURCE_ENERGY } from "game/constants";
import { Flag } from "arena";

export function loop(): void {
  // console.log(`The time is ${getTime()}`);

  const attack = constants.ATTACK;

  const costMatrix = new CostMatrix();

  const noUtilsCreeps = getObjectsByPrototype(Creep).filter(i => i.my);

  const myCreeps = utils
    .getObjectsByPrototype(prototypes.Creep)
    .filter(i => i.my); // $ExpectType Creep[]
  const enemyCreeps = utils
    .getObjectsByPrototype(prototypes.Creep)
    .filter(i => !i.my); // $ExpectType Creep[]
  const enemyFlag = utils.getObjectsByPrototype(Flag).find(i => !i.my); // $ExpectType Flag

  const structures = utils.getObjectsByPrototype(Structure); // $ExpectType Structure[]
  const ownedStructures = utils.getObjectsByPrototype(OwnedStructure); // $ExpectType OwnedStructure[]

  const noUtilStructures = getObjectsByPrototype(Structure); // $ExpectType Structure[]
  const noUtilOwnedStructures = getObjectsByPrototype(OwnedStructure); // $ExpectType OwnedStructure[]

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

    const findClosestByRange = myTower.findClosestByRange(
      getObjectsByPrototype(Creep).filter(i => !i.my)
    ); // $ExpectType Creep
    const findInRange = myTower.findInRange(enemyCreeps, 1); // $ExpectType Creep[]
    const findPathTo = myTower.findPathTo(findInRange[0]); // $ExpectType PathStep[]
    // TODO: findPathTo with options
    const findClosestByPath = myTower.findClosestByPath(enemyCreeps);
    // TODO: findClosestByPath with options
  }

  // build a rampart
  createConstructionSite(10, 10, StructureRampart);
  createConstructionSite(10, 10, prototypes.StructureRampart);
  // TODO: verify all buildable structure types
  // TODO: cSites .structure property.

  // TODO: test utils findXXX methods, theese methods are used by other metods.
}
