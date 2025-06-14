export default Step;
declare class Step {
    static parse(args: any, context: any): any;
    constructor(type: any, input: any, stops: any);
    type: any;
    input: any;
    labels: any[];
    outputs: any[];
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): boolean;
    serialize(): any[];
}
