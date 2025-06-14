export default Literal;
declare class Literal {
    static parse(args: any, context: any): any;
    constructor(type: any, value: any);
    type: any;
    value: any;
    evaluate(): any;
    eachChild(): void;
    outputDefined(): boolean;
    serialize(): any;
}
