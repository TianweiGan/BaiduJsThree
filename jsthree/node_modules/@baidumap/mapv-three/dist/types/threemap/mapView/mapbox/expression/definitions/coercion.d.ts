export default Coercion;
/**
 * Special form for error-coalescing coercion expressions "to-number",
 * "to-color".  Since these coercions can fail at runtime, they accept multiple
 * arguments, only evaluating one at a time until one succeeds.
 *
 * @private
 */
declare class Coercion {
    static parse(args: any, context: any): any;
    constructor(type: any, args: any);
    type: any;
    args: any;
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): any;
    serialize(): any[];
}
