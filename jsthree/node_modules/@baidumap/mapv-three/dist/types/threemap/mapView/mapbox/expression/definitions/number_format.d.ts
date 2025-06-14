export default class NumberFormat {
    static parse(args: any, context: any): any;
    constructor(number: any, locale: any, currency: any, unit: any, minFractionDigits: any, maxFractionDigits: any);
    type: {
        kind: string;
    };
    number: any;
    locale: any;
    currency: any;
    unit: any;
    minFractionDigits: any;
    maxFractionDigits: any;
    evaluate(ctx: any): string;
    eachChild(fn: any): void;
    outputDefined(): boolean;
    serialize(): any[];
}
