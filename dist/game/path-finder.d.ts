declare module "game/path-finder" {
  import { GameObject, Position, _Constructor } from "game/prototypes";

  export type Goal = Position | { pos: Position; range: number };

  export function searchPath(
    origin: Position,
    goal: Goal | Goal[],
    options?: SearchPathOptions
  ): SearchPathResult;

  export interface CostMatrix {
    _bits: Uint8Array;

    /**
     * Set the cost of a position in this CostMatrix.
     * @param x X position in the room.
     * @param y Y position in the room.
     * @param cost Cost of this position. Must be a whole number. A cost of 0 will use the terrain cost for that tile. A cost greater than or equal to 255 will be treated as unwalkable.
     */
    set(x: number, y: number, cost: number): void;

    /**
     * Get the cost of a position in this CostMatrix.
     * @param x X position in the room.
     * @param y Y position in the room.
     */
    get(x: number, y: number): number;

    /**
     * Copy this CostMatrix into a new CostMatrix with the same data.
     */
    clone(): CostMatrix;
  }

  interface CostMatrixConstructor
    extends _Constructor<CostMatrix>,
      CostMatrix {}

  export const CostMatrix: CostMatrixConstructor;

  export interface SearchPathResult {
    /** The path found as an array of objects containing x and y properties */
    path: Position[];

    /** Total number of operations performed before this path was calculated */
    ops: number;

    /** The total cost of the path as derived from plainCost, swampCost, and given CostMatrix instance */
    cost: number;

    /** If the pathfinder fails to find a complete path, this will be true */
    incomplete: boolean;
  }

  export interface SearchPathOptions {
    /** Custom navigation cost data */
    costMatrix?: CostMatrix;

    /** Cost for walking on plain positions. The default is 2 */
    plainCost?: number;

    /** Cost for walking on swamp positions. The default is 10 */
    swampCost?: number;

    /**
     * Instead of searching for a path to the goals this will search for a path away from the goals.
     * The cheapest path that is out of range of every goal will be returned.
     * The default is false
     */
    flee?: boolean;

    /** The maximum allowed pathfinding operations. The default value is 50000 */
    maxOps?: number;

    /** The maximum allowed cost of the path returned. The default is Infinity */
    maxCost?: number;

    /** Weight from 1 to 9 to apply to the heuristic in the A* formula F = G + weight * H. The default value is 1.2 */
    heuristicWeight?: number;

    /**
     * An array of the room's objects or Position objects which should be treated as obstacles during the search
     */
    ignore?: Position[];
  }

  export interface FindPathOptions extends SearchPathOptions {
    /**
     * An array of the room's objects which should be treated as obstacles during the search
     */
    ignore?: GameObject[];
  }
}
