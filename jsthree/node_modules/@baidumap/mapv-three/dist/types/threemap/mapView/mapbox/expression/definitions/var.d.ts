export default Var;
declare class Var {
    static parse(args: any, context: any): any;
    constructor(name: any, boundExpression: any);
    type: any;
    name: any;
    boundExpression: any;
    evaluate(ctx: any): any;
    eachChild(): void;
    outputDefined(): boolean;
    serialize(): any[];
}
