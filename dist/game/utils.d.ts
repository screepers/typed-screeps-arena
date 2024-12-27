/* eslint-disable camelcase */
declare module "game/utils" {
  import {
    BuildableStructure,
    DirectionConstant,
    ERR_FULL,
    ERR_INVALID_ARGS,
    ERR_INVALID_TARGET,
    TERRAIN_PLAIN,
    TERRAIN_SWAMP,
    TERRAIN_WALL,
    TerrainConstant,
  } from "game/constants";
  import {
    ConstructionSite,
    GameObject,
    Id,
    Position,
    _Constructor,
  } from "game/prototypes";
  import { FindPathOptions } from "game/path-finder";

  export interface HeapStatistics {
    total_heap_size: number;
    total_heap_size_executable: number;
    total_physical_size: number;
    total_available_size: number;
    used_heap_size: number;
    heap_size_limit: number;
    malloced_memory: number;
    peak_malloced_memory: number;
    does_zap_garbage: 0 | 1;
    number_of_native_contexts: number;
    number_of_detached_contexts: number;
    externally_allocated_size: number;
  }

  /**
   * Get count of game ticks passed since the start of the game
   */
  export function getTicks(): number;

  /**
   * Get an object with the specified unique ID.
   * @param id The id property of the needed object. See GameObject prototype.
   */
  export function getObjectById<T>(id: Id<T>): T | null;

  /**
   * Get all objects in the game.
   */
  export function getObjects(): GameObject[];

  /**
   * Get all objects in the game with the specified prototype, for example, all creeps
   * @param prototype A prototype that extends GameObject
   * @returns Array of objects with the specified prototype
   */
  export function getObjectsByPrototype<T>(prototype: _Constructor<T>): T[];

  /**
   * Use this method to get heap statistics for your virtual machine
   */
  export function getHeapStatistics(): HeapStatistics;

  /**
   * Get linear direction by differences of x and y
   */
  export function getDirection(dx: number, dy: number): DirectionConstant;

  /**
   * Find an optimal path between fromPos and toPos.
   * Unlike {@link searchPath}, findPath avoid all obstacles by default (unless costMatrix is specified).
   * @param fromPos The start position. May be GameObject or any object containing x and y properties.
   * @param toPos The target position. May be GameObject or any object containing x and y properties.
   * @param options An object containing additional pathfinding flags
   * @param options.costMatrix Custom navigation cost data
   * @param options.plainCost Cost for walking on plain positions. The default is 2
   * @param options.swampCost Cost for walking on swamp positions. The default is 10
   * @param options.flee Instead of searching for a path to the goals this will search for a path away from the goals. The default is false
   * @param options.maxOps The maximum allowed pathfinding operations. The default value is 50000
   * @param options.maxCost The maximum allowed cost of the path returned. The default is Infinity
   * @param options.heuristicWeight Weight from 1 to 9 to apply to the heuristic in the A* formula F = G + weight * H. The default value is 1.2
   * @param options.ignore objects which should not be treated as obstacles during the search
   * @returns the path found as an array of objects containing x and y properties
   */
  export function findPath(
    fromPos: Position,
    toPos: Position,
    options?: FindPathOptions
  ): Position[];

  /**
   * Get linear range between two objects. a and b may be any object containing x and y properties.
   * @deprecated alias for getRange
   */
  export function getDistance(a: Position, b: Position): number;

  /**
   * Get linear range between two objects. a and b may be any object containing x and y properties.
   * @param a The first of two objects. May be GameObject or any object containing x and y properties.
   * @param b The second of two objects. May be GameObject or any object containing x and y properties.
   * @returns a number of squares between two objects
   */
  export function getRange(a: Position, b: Position): number;

  /**
   * Get an integer representation of the terrain at the given position.
   * Returns TERRAIN_WALL, TERRAIN_SWAMP, or TERRAIN_PLAIN.
   * @param pos pos should be an object containing x and y properties
   */
  export function getTerrainAt(pos: Position): TerrainConstant;

  /**
   * Find all positions from the given positions array within the specified linear range.
   */
  export function findInRange<T extends Position>(
    fromPos: Position,
    positions: T[],
    range: number
  ): T[];

  /**
   * Find a position with the shortest linear distance from the given position
   * @param fromPos The position to search from. May be GameObject or any object containing x and y properties
   * @param positions The positions to search among. An array of GameObject or any objects containing x and y properties
   * @returns the closest object from {@link positions}
   */
  export function findClosestByRange<T extends Position>(
    fromPos: Position,
    positions: T[]
  ): T;

  /**
   * Find a position with the shortest path from the given position
   * @param fromPos The position to search from. May be GameObject or any object containing x and y properties
   * @param positions The positions to search among. An array of GameObject or any objects containing x and y properties
   * @param options An object containing additional pathfinding flags
   * @param options.costMatrix Custom navigation cost data
   * @param options.plainCost Cost for walking on plain positions. The default is 2
   * @param options.swampCost Cost for walking on swamp positions. The default is 10
   * @param options.flee Instead of searching for a path to the goals this will search for a path away from the goals. The default is false
   * @param options.maxOps The maximum allowed pathfinding operations. The default value is 50000
   * @param options.maxCost The maximum allowed cost of the path returned. The default is Infinity
   * @param options.heuristicWeight Weight from 1 to 9 to apply to the heuristic in the A* formula F = G + weight * H. The default value is 1.2
   * @param options.ignore objects which should not be treated as obstacles during the search
   * @returns the closest object from {@link positions}, or null if there was no valid positions
   */
  export function findClosestByPath<T extends Position>(
    fromPos: Position,
    positions: T[],
    options?: FindPathOptions
  ): T;

  /**
   * Create new ConstructionSite at the specified location.
   * @param x The X position.
   * @param y The Y position.
   * @param structurePrototype One of the following constants: StuctureExtension, StructureTower
   * @returns Result Code: OK, ERR_INVALID_TARGET, ERR_INVALID_ARGS, ERR_RCL_NOT_ENOUGH
   * @deprecated use the overload with a Position object
   */
  export function createConstructionSite<T extends BuildableStructure>(
    x: number,
    y: number,
    structureType: _Constructor<T>
  ): {
    object?: ConstructionSite<T>;
    error?: ERR_INVALID_ARGS | ERR_INVALID_TARGET | ERR_FULL;
  };

  /**
   * Create new ConstructionSite at the specified location.
   * @param pos The X,Y position.
   * @param structurePrototype One of the following constants: StuctureExtension, StructureTower
   * @returns Result Code: OK, ERR_INVALID_TARGET, ERR_INVALID_ARGS, ERR_RCL_NOT_ENOUGH
   */
  export function createConstructionSite(
    pos: Position,
    structureType: _Constructor<BuildableStructure>
  ): {
    object?: ConstructionSite;
    error?: ERR_INVALID_ARGS | ERR_INVALID_TARGET | ERR_FULL;
  };

  /**
   * Get CPU wall time elapsed in the current tick in nanoseconds.
   */
  export function getCpuTime(): number;
}
