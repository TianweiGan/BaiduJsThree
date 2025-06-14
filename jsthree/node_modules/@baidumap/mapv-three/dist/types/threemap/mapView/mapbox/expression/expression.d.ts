export default class Expression {
    type: any;
    evaluate(ctx: any): void;
    eachChild(fn: any): void;
    /**
     * Statically analyze the expression, attempting to enumerate possible outputs. Returns
     * false if the complete set of outputs is statically undecidable, otherwise true.
     */
    outputDefined(): void;
    serialize(): void;
}
