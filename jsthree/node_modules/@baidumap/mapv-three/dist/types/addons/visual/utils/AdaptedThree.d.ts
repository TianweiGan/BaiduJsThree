/**
 * 添加attribute
 * @param { Object } bufferGeomertry 几何
 * @param {string} key 关键字
 * @param { Object } value 值
 * @returns {Object} bufferGeomertry
 */
export function addAttribute(bufferGeomertry: Object, key: string, value: Object): Object;
/**
 * 移出attribute
 * @param { Object } bufferGeomertry 几何
 * @param {string} key 关键字
 * @param { Object } value 值
 * @returns {Object} bufferGeomertry
 */
export function removeAttribute(bufferGeomertry: Object, key: string): Object;
/**
 * 设置射线精度
 * @param { Object } raycaster 射线
 * @param {number} linePrecision 精度
 */
export function setRaycasterLinePrecision(raycaster: Object, linePrecision: number): void;
