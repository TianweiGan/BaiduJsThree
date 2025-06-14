export default Let;
declare class Let {
    static parse(args: any, context: any): any;
    constructor(bindings: any, result: any);
    type: any;
    bindings: never[];
    result: any;
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): any;
    serialize(): string[];
}
