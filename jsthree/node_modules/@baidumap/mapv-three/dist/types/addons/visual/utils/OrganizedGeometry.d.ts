/**
 * 组装building的geometry
 * @param {Array} features geojson中的feature数组
 * @param {Object} style 样式
 * @returns {Object}
 */
export function organizedBuilding(features: any[], style: Object): Object;
/**
 * 组装fence的geometry
 * @param {Array} features geojson中的feature数组
 * @param {Object} style 样式
 * @returns {Object}
 */
export function organizedFence(features: any[], style: Object): Object;
/**
 * 组装polygon的geometry
 * @param {Array} features geojson中的feature数组
 * @returns {Object}
 */
export function organizedPolygon(features: any[]): Object;
/**
 * 组装polyline的geometry
 * @param {Array} features geojson中的feature数组
 * @param {string} nameOfHeightProperty 属性中有高度时，表示高度字段的名字
 * @returns {Object}
 */
export function organizedPolyline(features: any[], nameOfHeightProperty: string): Object;
/**
 * 组装point的geometry
 * @param {Array} features geojson中的feature数组
 * @returns {Object}
 */
export function organizedPoint(features: any[]): Object;
