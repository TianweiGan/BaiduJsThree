export default At;
declare class At {
    static parse(args: any, context: any): any;
    constructor(type: any, index: any, input: any);
    type: any;
    index: any;
    input: any;
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): boolean;
    serialize(): any[];
}
