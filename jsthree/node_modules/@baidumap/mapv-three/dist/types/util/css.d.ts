/**
 * 给元素添加样式名
 * @param {HTMLElement} elem 绑定样式的元素
 * @param {string} className class样式名
 */
export function addClass(elem: HTMLElement, className: string): HTMLElement;
/**
 * 给元素移除样式名
 * @param {HTMLElement} elem 绑定样式的元素
 * @param {string} className class样式名
 */
export function removeClass(elem: HTMLElement, className: string): HTMLElement;
/**
 * 查询元素上是否存在样式名
 * @param {HTMLElement} elem 绑定样式的元素
 * @param {string} className class样式名
 */
export function hasClass(elem: HTMLElement, className: string): boolean;
export function loadCss(url: any, indoc: any): void;
export function injectStyle(cssContent: any, indoc: any): void;
/**
 * @file 样式文件处理
 * @author hedongran [hdr01@126.com]
 */
export const CSS_NAMESPACE: "mapv";
