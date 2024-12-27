declare module "game/prototypes" {
  import { FindPathOptions } from "game/path-finder";

  export interface GameObjectJSON {
    id: number;
    x: number;
    y: number;
  }

  /** Position of object in the room */
  export interface Position {
    /** The X coordinate in the room */
    x: number;
    /** The Y coordinate in the room */
    y: number;
  }

  /**
   * Basic prototype for game objects.
   * All objects and classes are inherited from this class
   */
  export interface GameObject extends Position {
    /**
     * A unique object identificator.
     * You can use {@link getObjectById} method to retrieve an object instance by its id.
     */
    id: Id<this>;

    // constructor(id: any);
    /**
     * Returns true if this object is live in the game at the moment. Check this property to verify cached or newly created object instances.
     */
    exists: boolean;

    /**
     * If defined, then this object will disappear after this number of ticks.
     */
    ticksToDecay?: number;

    /**
     * Get linear range to another position. pos may be any object containing x and y properties.
     * @param pos The target object. May be GameObject or any object containing x and y properties
     * @returns a number of squares between two objects
     */
    getRangeTo(pos: Position): number;

    /**
     * Returns the path from this object to another position.
     * @param pos The target position. May be GameObject or any object containing x and y properties
     * @param options An object with additional options that are passed to the findPath method
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
    findPathTo(pos: Position, options?: FindPathOptions): Position[];

    /**
     * Find all positions from the given positions array within the specified linear range.
     * @param positions The positions to search. An array of GameObject or any objects containing x and y properties
     * @param range The range distance
     * @returns an array with the objects found
     */
    findInRange<T extends Position>(positions: T[], range: number): T[];

    /**
     * Find a position with the shortest linear distance from the given position, or null otherwise.
     * @param positions The positions to search among. An array of GameObject or any objects containing x and y properties
     * @returns the closest object from positions array
     */
    findClosestByRange<T extends Position>(positions: T[]): T | null;

    /**
     * Find a position with the shortest path from this game object
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
     * @returns the closest object from positions, or null if there was no valid positions
     */
    findClosestByPath<T extends Position>(
      positions: T[],
      options?: FindPathOptions
    ): T | null;

    toJSON(): GameObjectJSON;
  }

  interface GameObjectConstructor
    extends _Constructor<GameObject>,
      _ConstructorById<GameObject> {}

  export const GameObject: GameObjectConstructor;
}
