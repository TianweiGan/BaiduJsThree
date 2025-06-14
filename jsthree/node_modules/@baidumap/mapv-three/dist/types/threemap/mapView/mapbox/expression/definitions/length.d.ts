export default Length;
declare class Length {
    static parse(args: any, context: any): any;
    constructor(input: any);
    type: {
        kind: string;
    };
    input: any;
    evaluate(ctx: any): number;
    eachChild(fn: any): void;
    outputDefined(): boolean;
    serialize(): string[];
}
