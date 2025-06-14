export default In;
declare class In {
    static parse(args: any, context: any): any;
    constructor(needle: any, haystack: any);
    type: {
        kind: string;
    };
    needle: any;
    haystack: any;
    evaluate(ctx: any): boolean;
    eachChild(fn: any): void;
    outputDefined(): boolean;
    serialize(): any[];
}
