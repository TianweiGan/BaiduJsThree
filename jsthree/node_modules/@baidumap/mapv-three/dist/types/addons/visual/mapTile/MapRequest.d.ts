/**
 * 地图数据请求类
 * @constructor 新建实例
 * @param {Array} mapLayers 地图图层数组
 * @param {number} maxLevel 最大图层
 * @param {Function} callback 回调
 */
export class MapRequest {
    constructor(mapLayers: any, maxLevel: any, callback: any);
    mapLayers: any;
    maxLevel: any;
    callback: any;
    priorityQueue: any;
    /**
     * 添加MapLayer
     * @param {Object} mapLayer MapLayer的实例
     */
    addMapLayer(mapLayer: Object): void;
    /**
     * 根据url获取MapLayer
     * @param {string} url 数据存储网址
     * @returns {Object} mapLayer
     */
    getMapLayer(url: string): Object;
    /**
     * 移除mapLayer
     * @param {Object} mapLayer MapLayer的实例
     */
    removeMapLayer(mapLayer: Object): void;
    /**
     * 初始化
     */
    initialize(): void;
    /**
     * 将根节点的tile添加至队列
     * @param {Object} root 根tile
     * @param {number} index mapLayer的索引位置
     */
    addRootTileToQueue(root: Object, index: number): void;
    /**
     * 将根节点的tile从队列中移除
     * @param {Object} root 根tile
     * @param {number} index mapLayer的索引
     */
    removeRootTileFromQueue(root: Object, index: number): void;
    /**
     * 更新可见mapLayer的结构
     * @param {Array} mapLayers mapLayer的数组
     * @param {Object} camera 相机
     * @returns {Object}
     */
    updateVisibilityStructures(mapLayers: any[], camera: Object): Object;
    /**
     * 更新瓦片地图的可见性
     * @param {Array} mapLayers mapLayer数组
     * @param {Object} camera 相机
     * @param {Object} renderer 渲染类实例
     * @returns {Object}
     */
    updateVisibility(mapLayers: any[], camera: Object, renderer: Object): Object;
    /**
     * 更新mapLayer
     * @param {Object} mapLayers 图层
     * @param {Object} camera 相机
     * @param {Object} renderer 渲染类实例
     * @returns {Object}
     */
    updateMapLayers(mapLayers: Object, camera: Object, renderer: Object): Object;
}
