/**
 * An RGBA color value. Create instances from color strings using the static
 * method `Color.parse`. The constructor accepts RGB channel values in the range
 * `[0, 1]`, premultiplied by A.
 *
 * @param {number} r The red channel.
 * @param {number} g The green channel.
 * @param {number} b The blue channel.
 * @param {number} a The alpha channel.
 * @private
 */
export class Color {
    static black: any;
    static white: any;
    static transparent: any;
    static red: any;
    static blue: any;
    /**
     * Parses valid CSS color strings and returns a `Color` instance.
     * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
     */
    static parse(input: any): Color | undefined;
    constructor(r: any, g: any, b: any, a: any);
    r: any;
    g: any;
    b: any;
    a: any;
    /**
     * Returns an RGBA string representing the color value.
     *
     * @returns An RGBA string.
     * @example
     * var purple = new Color.parse('purple');
     * purple.toString; // = "rgba(128,0,128,1)"
     * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
     * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
     */
    toString(): string;
    /**
     * Returns an RGBA array of values representing the color, unpremultiplied by A.
     *
     * @returns An array of RGBA color values in the range [0, 255].
     */
    toArray(): any[];
    /**
     * Returns a RGBA array of float values representing the color, unpremultiplied by A.
     *
     * @returns An array of RGBA color values in the range [0, 1].
     */
    toArray01(): any[];
    /**
     * Returns an RGBA array of values representing the color, premultiplied by A.
     *
     * @returns An array of RGBA color values in the range [0, 1].
     */
    toArray01PremultipliedAlpha(): any[];
}
