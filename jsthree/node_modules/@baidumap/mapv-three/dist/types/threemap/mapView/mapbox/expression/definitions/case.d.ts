export default Case;
declare class Case {
    static parse(args: any, context: any): any;
    constructor(type: any, branches: any, otherwise: any);
    type: any;
    branches: any;
    otherwise: any;
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): any;
    serialize(): string[];
}
