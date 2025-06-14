export const Equals: {
    new (lhs: any, rhs: any, collator: any): {
        type: {
            kind: string;
        };
        lhs: any;
        rhs: any;
        collator: any;
        hasUntypedArgument: boolean;
        evaluate(ctx: any): any;
        eachChild(fn: any): void;
        outputDefined(): boolean;
        serialize(): any[];
    };
    parse(args: any, context: any): any;
};
export const NotEquals: {
    new (lhs: any, rhs: any, collator: any): {
        type: {
            kind: string;
        };
        lhs: any;
        rhs: any;
        collator: any;
        hasUntypedArgument: boolean;
        evaluate(ctx: any): any;
        eachChild(fn: any): void;
        outputDefined(): boolean;
        serialize(): any[];
    };
    parse(args: any, context: any): any;
};
export const LessThan: {
    new (lhs: any, rhs: any, collator: any): {
        type: {
            kind: string;
        };
        lhs: any;
        rhs: any;
        collator: any;
        hasUntypedArgument: boolean;
        evaluate(ctx: any): any;
        eachChild(fn: any): void;
        outputDefined(): boolean;
        serialize(): any[];
    };
    parse(args: any, context: any): any;
};
export const GreaterThan: {
    new (lhs: any, rhs: any, collator: any): {
        type: {
            kind: string;
        };
        lhs: any;
        rhs: any;
        collator: any;
        hasUntypedArgument: boolean;
        evaluate(ctx: any): any;
        eachChild(fn: any): void;
        outputDefined(): boolean;
        serialize(): any[];
    };
    parse(args: any, context: any): any;
};
export const LessThanOrEqual: {
    new (lhs: any, rhs: any, collator: any): {
        type: {
            kind: string;
        };
        lhs: any;
        rhs: any;
        collator: any;
        hasUntypedArgument: boolean;
        evaluate(ctx: any): any;
        eachChild(fn: any): void;
        outputDefined(): boolean;
        serialize(): any[];
    };
    parse(args: any, context: any): any;
};
export const GreaterThanOrEqual: {
    new (lhs: any, rhs: any, collator: any): {
        type: {
            kind: string;
        };
        lhs: any;
        rhs: any;
        collator: any;
        hasUntypedArgument: boolean;
        evaluate(ctx: any): any;
        eachChild(fn: any): void;
        outputDefined(): boolean;
        serialize(): any[];
    };
    parse(args: any, context: any): any;
};
