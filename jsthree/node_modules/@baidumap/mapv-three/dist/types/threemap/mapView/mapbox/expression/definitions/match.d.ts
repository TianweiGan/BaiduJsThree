export default Match;
declare class Match {
    static parse(args: any, context: any): any;
    constructor(inputType: any, outputType: any, input: any, cases: any, outputs: any, otherwise: any);
    type: any;
    inputType: any;
    input: any;
    cases: any;
    outputs: any;
    otherwise: any;
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): any;
    serialize(): any[];
}
