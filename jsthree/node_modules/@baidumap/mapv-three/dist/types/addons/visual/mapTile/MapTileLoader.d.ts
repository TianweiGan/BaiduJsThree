/**
 * 瓦片地图加载类
 * @param {Object } mapLayer 地图图层
 * @param {Boolean } debugger 调试模式
 */
export class MapTileLoader {
    constructor(mapLayer: any, debuggerMode: any);
    name: string;
    mapLayer: any;
    workerUrl: string | null;
    debuggerMode: any;
    /**
     * 加载tile数据
     * @param {Object} tile MapTile实例
     */
    load(tile: Object): void;
    /**
     * 生成几何体
     * @param {string} name 名字
     * @param {Object} data 组装好的数据
     * @param {Object} tile MapTile实例
     */
    generateObject(name: string, data: Object, tile: Object): null | undefined;
    onmessage(e: any, tile: any): void;
    saveAttribute2DB(url: any, e: any): void;
}
