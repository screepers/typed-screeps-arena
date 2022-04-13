declare module "game/prototypes" {
  export type StructureConstant =
    | STRUCTURE_TOWER
    | STRUCTURE_EXTENSION
    | STRUCTURE_WALL
    | STRUCTURE_CONTAINER
    | STRUCTURE_RAMPART
    | STRUCTURE_SPAWN
    | STRUCTURE_ROAD
    | STRUCTURE_EXTENSION;

  export interface StructureJSON extends RoomObjectJSON {
    hits: number;
    hitsMax: number;
  }
  export interface Structure<T extends StructureConstant = StructureConstant> extends GameObject {
    readonly prototype: Structure;

    /**
     * The current amount of hit points of the structure.
     */
    hits: number;
    /**
     * The total amount of hit points of the structure.
     */
    hitsMax: number;

    toJSON(): StructureJSON;
  }

  export const Structure: _Constructor<Structure>;
}
