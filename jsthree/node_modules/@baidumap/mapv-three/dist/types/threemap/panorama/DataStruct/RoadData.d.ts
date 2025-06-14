/**
 * @file 道路数据定义
 * @author quda
 */
export class RoadData {
    /**
     * 道路ID
     * @property rid
     * @type {string}
     */
    rid: string;
    /**
     * 道路名称
     * @property roadName
     * @type {string}
     */
    roadName: string;
    /**
     * 路宽（单位米）
     * @property roadWidth
     * @type {number}
     * @default 5
     */
    roadWidth: number;
    /**
     * 用来标识是否是当前点所在道路
     * @property isCurrentRoad
     */
    isCurrentRoad: number;
    /**
     * 当前道路的数据点数组，
     * 每一个元素是一个道路点对象
     * @property pointList
     * @type {Array}
     */
    pointList: any[];
    /**
     * 如果街景点落在当前道路上， 求街景点在当前道路上的拓扑点。
     * @param {string} panoId - 场景点ID
     * @return {Array} - 返回一个弧度的数组 每一项为一个object
     */
    getTopoInRoad: (panoId: string) => any[];
    /**
     * 生成一个拓扑对象， 用来生成拓扑数据对象。
     * @method generateTopoData
     * @param {number} degree - 拓扑箭头的朝向
     * @param {Object} pointData - 道路上的场景点对象
     * @return {Object} - 添加了topoDir和roadName的pointData
     */
    generateTopoData(degree: number, pointData: Object): Object;
    /**
     * 获取场景点ID对应在当前道路上的场景点信息，
     * 如果查找不到，则返回undefined
     * @method getPointBypanoId
     * @param  {string}  panoId - 场景点ID
     * @return  {Object} - 道路上的单点对象
     */
    getPointByPanoId: (panoId: string) => Object;
}
