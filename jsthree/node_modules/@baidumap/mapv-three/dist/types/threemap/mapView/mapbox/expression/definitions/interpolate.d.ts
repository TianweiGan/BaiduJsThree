export default Interpolate;
declare class Interpolate {
    static interpolationFactor(interpolation: any, input: any, lower: any, upper: any): number;
    static parse(args: any, context: any): any;
    constructor(type: any, operator: any, interpolation: any, input: any, stops: any);
    type: any;
    operator: any;
    interpolation: any;
    input: any;
    labels: any[];
    outputs: any[];
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): boolean;
    serialize(): any[];
}
