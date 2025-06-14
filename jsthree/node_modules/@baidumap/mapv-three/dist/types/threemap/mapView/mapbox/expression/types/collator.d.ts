export default class Collator {
    constructor(caseSensitive: any, diacriticSensitive: any, locale: any);
    locale: any;
    sensitivity: string;
    collator: Intl.Collator;
    compare(lhs: any, rhs: any): number;
    resolvedLocale(): string;
}
