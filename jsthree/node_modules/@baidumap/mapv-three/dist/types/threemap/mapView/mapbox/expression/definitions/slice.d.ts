export default Slice;
declare class Slice {
    static parse(args: any, context: any): any;
    constructor(type: any, input: any, beginIndex: any, endIndex: any);
    type: any;
    input: any;
    beginIndex: any;
    endIndex: any;
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): boolean;
    serialize(): any[];
}
