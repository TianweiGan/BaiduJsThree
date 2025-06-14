export default IndexOf;
declare class IndexOf {
    static parse(args: any, context: any): any;
    constructor(needle: any, haystack: any, fromIndex: any);
    type: {
        kind: string;
    };
    needle: any;
    haystack: any;
    fromIndex: any;
    evaluate(ctx: any): any;
    eachChild(fn: any): void;
    outputDefined(): boolean;
    serialize(): any[];
}
