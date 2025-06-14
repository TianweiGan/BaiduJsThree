export default Within;
declare class Within {
    static parse(args: any, context: any): any;
    constructor(geojson: any, geometries: any);
    type: {
        kind: string;
    };
    geojson: any;
    geometries: any;
    evaluate(ctx: any): boolean;
    eachChild(): void;
    outputDefined(): boolean;
    serialize(): any[];
}
