/**
 * 地图图层加载类
 */
export class MapLayerLoader {
    constructor(args?: {});
    name: string;
    debuggerMode: any;
    /**
     * 加载函数
     * @param {string} url 网络地址
     * @param {Function} callback 回调
     * @param {Object} mapLayer MapLayer实例
     */
    load(url: string, callback: Function, mapLayer: Object): void;
}
