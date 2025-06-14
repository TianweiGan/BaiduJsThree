export default Assertion;
declare class Assertion {
    static parse(args: any, context: any): any;
    constructor(type: any, args: any);
    type: any;
    args: any;
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): any;
    serialize(): any[];
}
