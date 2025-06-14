/**
 * 生产点几何体
 * @param {Object} style 样式
 * @param {Object} data 数据
 * @param {boolean} isArrayBuffer 是否是Arraybuffer
 * @returns {Object} Points
 */
export function generatePointObject(style: Object, data: Object, isArrayBuffer: boolean): Object;
/**
 * 生产线几何体
 * @param {Object} style 样式
 * @param {Object} data 数据
 * @param {boolean} isArrayBuffer 是否是Arraybuffer
 * @returns {Object} Line
 */
export function generatePolylineObject(style: Object, data: Object, isArrayBuffer: boolean): Object;
/**
 * 生产点面何体
 * @param {Object} style 样式
 * @param {Object} data 数据
 * @param {boolean} isArrayBuffer 是否是Arraybuffer
 * @returns {Object} Mesh
 */
export function generatePolygonObject(style: Object, data: Object, isArrayBuffer: boolean, name: any): Object;
/**
 * 生产点面何体
 * @param {Object} style 样式
 * @param {Object} data 数据
 * @param {boolean} isArrayBuffer 是否是Arraybuffer
 * @returns {Object} Mesh
 */
export function generateBuildingObject(style: Object, data: Object, isArrayBuffer: boolean): Object;
