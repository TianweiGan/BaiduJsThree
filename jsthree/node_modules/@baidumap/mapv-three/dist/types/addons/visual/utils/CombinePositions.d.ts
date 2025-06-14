/**
 * 获取线段的segment数组
 * @param {Array} polyline 线段的点坐标
 * @param {Array} center 线段的中心点
 * @param {string} nameOfHeightProperty 属性中有高度时，表示高度字段的名字
 * @returns {Object} 组装的数据
 */
export function getSegmentsPositions(polyline: any[], center: any[], nameOfHeightProperty: string): Object;
/**
 * 获取线段的vector数据
 * @param {Array} polyline 线段的点坐标
 * @param {Array} center 线段的中心点
 * @returns {Object} 组装的数据
 */
export function getSegmentsVectors(polyline: any[], center: any[]): Object;
/**
 *
 * 获取面参数
 * @param {Array} polygon 面的点坐标
 * @param {Array} center 面的中心点
 * @returns {Object} 组装的数据
 */
export function getPolygonParams(polygon: any[], center: any[]): Object;
