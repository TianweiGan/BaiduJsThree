export function overrideShaders(): void;
export function addMrtSupportFragmentShader(source: any): any;
export function addNMrtSupportFragmentShader(source: any): any;
/**
 * @param {*} shader
 * @param {*} beforeMainStart main声明之前
 * @param {*} afterMainStart main声明之后
 * @param {*} beforeMainEnd main函数最后部分
 */
export function addExtraCodeToShader(shader: any, beforeMainStart: any, afterMainStart: any, beforeMainEnd: any): any;
export function addEditableToVertexShader(shader: any): any;
export function addClipableToVertexShader(shader: any): any;
export function addClipableToFragmentShader(shader: any): any;
