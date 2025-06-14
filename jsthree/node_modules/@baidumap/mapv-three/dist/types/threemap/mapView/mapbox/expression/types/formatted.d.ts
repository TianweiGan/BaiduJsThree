export class FormattedSection {
    constructor(text: any, image: any, scale: any, fontStack: any, textColor: any);
    text: any;
    image: any;
    scale: any;
    fontStack: any;
    textColor: any;
}
export default class Formatted {
    static fromString(unformatted: any): Formatted;
    static factory(text: any): Formatted;
    constructor(sections: any);
    sections: any;
    isEmpty(): boolean;
    toString(): any;
    serialize(): string[];
}
