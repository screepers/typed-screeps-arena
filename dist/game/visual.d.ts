declare module "game/visual" {
  import { RoomPosition, _Constructor } from "game/prototypes";

  /**
   * Visuals provide a way to show various visual debug info in the game.
   * All drawings will be shown for the current tick only.
   * All draw coordinates are measured in game coordinates and centered to tile centers, i.e. (10,10) will point to the center of the creep at x:10; y:10 position. Fractional coordinates are allowed.
   */
  export interface Visual {
    /**
     * The layer of visuals in the object.
     */
    layer: number;

    /**
     * Whether visuals in this object are persistent.
     */
    persistent: boolean;

    /**
     * Draw a line.
     * @param pos1 The start position object. May be GameObject or any object containing x and y properties.
     * @param pos2 The finish position object. May be GameObject or any object containing x and y properties.
     * @param style
     * 	An object with the following properties:
     * - width (number) Line width, default is 0.1.
     * - color (string) Line color in the following format: #ffffff (hex triplet). Default is #ffffff.
     * - opacity (number) Opacity value, default is 0.5.
     * - lineStyle (string) Either undefined (solid line), dashed, or dotted. Default is undefined.
     */
    line(pos1: RoomPosition, pos2: RoomPosition, style?: LineStyle): Visual;
    /**
     * Draw a circle.
     * @param pos The position object of the center. May be GameObject or any object containing x and y properties.
     * @param style An object with the following properties:
     * - radius (number) Circle radius, default is 0.15.
     * - fill (string) Fill color in the following format: #ffffff (hex triplet). Default is #ffffff.
     * - opacity (number) Opacity value, default is 0.5.
     * - stroke (string) Stroke color in the following format: #ffffff (hex triplet). Default is #ffffff.
     * - strokeWidth (number) Stroke line width, default is 0.1.
     * - lineStyle (string) Either undefined (solid line), dashed, or dotted. Default is undefined.
     */
    circle(pos: RoomPosition, style?: CircleStyle): Visual;

    /**
     * Draw a rectangle.
     * @param topLeftPos The position object of the top-left corner. May be GameObject or any object containing x and y properties.
     * @param width The width of the rectangle.
     * @param height The height of the rectangle.
     * @param style An object with the following properties:
     * - radius (number) Circle radius, default is 0.15.
     * - fill (string) Fill color in the following format: #ffffff (hex triplet). Default is #ffffff.
     * - opacity (number) Opacity value, default is 0.5.
     * - stroke (string) Stroke color in the following format: #ffffff (hex triplet). Default is #ffffff.
     * - strokeWidth (number) Stroke line width, default is 0.1.
     * - lineStyle (string) Either undefined (solid line), dashed, or dotted. Default is undefined.
     */
    rect(
      topLeftPos: RoomPosition,
      width: number,
      height: number,
      style?: PolyStyle
    ): Visual;
    /**
     * Draw a polyline.
     * @param points 	An array of points. Every item may be GameObject or any object containing x and y properties.
     * @param style An object with the following properties:
     * - fill (string) Fill color in the following format: #ffffff (hex triplet). Default is #ffffff.
     * - opacity (number) Opacity value, default is 0.5.
     * - stroke (string) Stroke color in the following format: #ffffff (hex triplet). Default is #ffffff.
     * - strokeWidth (number) Stroke line width, default is 0.1.
     * - lineStyle (string) Either undefined (solid line), dashed, or dotted. Default is undefined.
     */
    poly(points: RoomPosition[], style?: PolyStyle): Visual;
    /**
     * Draw a text label. You can use any valid Unicode characters, including emoji.
     * @param text The text message.
     * @param pos The position object of the label baseline. May be GameObject or any object containing x and y properties.
     * @param style An object with the following properties:
     * - color (string) Font color in the following format: #ffffff (hex triplet). Default is #ffffff.
     * - font (number|string) Either a number or a string in one of the following forms: "0.7" (relative size in game coordinates)
     * , "20px" (absolute size in pixels), "0.7 serif", or "bold italic 1.5 Times New Roman"
     * - stroke (string) Stroke color in the following format: #ffffff (hex triplet). default is undefined (no stroke).
     * - strokeWidth (number) Stroke line width, default is 0.15.
     * - backgroundColor (string) Background color in the following format: #ffffff (hex triplet).
     * Default is undefined (no background). When background is enabled, text vertical align is set to middle (default is baseline).
     * - backgroundPadding (number) Background rectangle padding, default is 0.3.
     * - aling (string) Text align, either center, left, or right. Default is center.
     * - opacity (number) Opacity value, default is 1.
     */
    text(text: string, pos: RoomPosition, style?: TextStyle): Visual;
    /**
     * Remove all visuals from the object.
     */
    clear(): Visual;
  }

  interface VisualConstructor extends _Constructor<Visual> {
    /**
     * Creates a new empty instance of Visual.
     * @param layer The layer of visuals in this object. Visuals of higher layer overlaps visuals of lower layer. Default is 0.
     * @param persistent Whether visuals in this object are persistent. Non-persistent visuals are visible during the current tick only.
     */
    new (layer?: number, persistent?: boolean): Visual;
    (): Visual;
  }

  export const Visual: VisualConstructor;
}

interface LineStyle {
  /**
   * Line width, default is 0.1.
   */
  width?: number;
  /**
   * Line color in any web format, default is #ffffff(white).
   */
  color?: string;
  /**
   * Opacity value, default is 0.5.
   */
  opacity?: number;
  /**
   * Either undefined (solid line), dashed, or dotted.Default is undefined.
   */
  lineStyle?: "dashed" | "dotted" | undefined;
}

interface PolyStyle {
  /**
   * Fill color in any web format, default is undefined (no fill).
   */
  fill?: string | undefined;
  /**
   * Opacity value, default is 0.5.
   */
  opacity?: number;
  /**
   * Stroke color in any web format, default is #ffffff (white).
   */
  stroke?: string;
  /**
   * Stroke line width, default is 0.1.
   */
  strokeWidth?: number;
  /**
   * Either undefined (solid line), dashed, or dotted. Default is undefined.
   */
  lineStyle?: "dashed" | "dotted" | "solid" | undefined;
}

interface CircleStyle extends PolyStyle {
  /**
   * Circle radius, default is 0.15.
   */
  radius?: number;
}

interface TextStyle {
  /**
   * Font color in any web format, default is #ffffff(white).
   */
  color?: string;
  /**
   * Either a number or a string in one of the following forms:
   * 0.7 - relative size in game coordinates
   * 20px - absolute size in pixels
   * 0.7 serif
   * bold italic 1.5 Times New Roman
   */
  font?: number | string;
  /**
   * Stroke color in any web format, default is undefined (no stroke).
   */
  stroke?: string | undefined;
  /**
   * Stroke width, default is 0.15.
   */
  strokeWidth?: number;
  /**
   * Background color in any web format, default is undefined (no background).When background is enabled, text vertical align is set to middle (default is baseline).
   */
  backgroundColor?: string | undefined;

  /**
   * Background rectangle padding, default is 0.3.
   */
  backgroundPadding?: number;
  align?: "center" | "left" | "right";
  /**
   * Opacity value, default is 1.0.
   */
  opacity?: number;
}
