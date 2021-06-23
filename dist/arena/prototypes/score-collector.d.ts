import {
  OwnedStructure,
  _Constructor,
  _ConstructorById
} from "../../game/prototypes";

export type STRUCTURE_SCORE_COLLECTOR = "constructedWall";
export interface ScoreCollector
  extends OwnedStructure<STRUCTURE_SCORE_COLLECTOR> {
  /**
   * The type of the resource this collector accepts.
   */
  resourceType: string;
  /**
   * Whether you have control over this collector.
   */
  my: boolean;
  /**
   * Current collected score number of the owner player.
   */
  score: number;
  /**
   * Total number of score needed to win instantly.
   */
  scoreTotal: number;
}

export const ScoreCollector: _Constructor<ScoreCollector>;
