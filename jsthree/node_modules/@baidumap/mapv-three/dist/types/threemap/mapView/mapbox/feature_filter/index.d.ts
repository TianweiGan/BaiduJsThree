export default createFilter;
/**
 * Given a filter expressed as nested arrays, return a new function
 * that evaluates whether a given feature (with a .properties or .tags property)
 * passes its test.
 *
 * @private
 * @param {Array} filter mapbox gl filter
 * @param {string} layerType the type of the layer this filter will be applied to.
 * @returns {Function} filter-evaluating function
 */
declare function createFilter(latest: any, filter: any[], layerType?: string): Function;
export function isExpressionFilter(filter: any): boolean;
export function isDynamicFilter(filter: any): boolean;
export function extractStaticFilter(filter: any): any;
