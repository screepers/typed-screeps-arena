declare module "game/prototypes" {
  /** An energy source object. Can be harvested by creeps with a WORK body part */
  export interface Source extends GameObject {
    readonly prototype: Source;

    /** Current amount of energy in the source */
    energy: number;

    /** The maximum amount of energy in the source */
    energyCapacity: number;
  }

  export const Source: _Constructor<Source>;
}
