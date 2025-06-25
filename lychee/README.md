# MCP + JS 复现《长安的荔枝》转运路线

## 项目简介
本项目演示如何基于 React + @baidumap/mapv-three + Three.js，并结合百度地图MCP自动规划、生成和展示路线。

## 主要功能
- 通过 MCP 自动获取真实可行的路线数据，并生成标准 GeoJSON 路线数据
- 使用 @baidumap/mapv-three 在地图上渲染路线，支持动态线条动画
- 路线高度坐标统一设置为 1，避免与底图重合

## 依赖安装
```bash
npm install --save @baidumap/mapv-three three react react-dom
npm install --save-dev webpack webpack-cli copy-webpack-plugin html-webpack-plugin @babel/core @babel/preset-env @babel/preset-react babel-loader
```

## 构建与运行
```bash
npx webpack
# 生成 dist/ 目录，浏览器打开 dist/index.html 预览
```

## 唐代荔枝驿道路线说明

### 路线概述
- 起点：广州市越秀区（古广州城中心）
- 终点：西安市碑林区（古长安城）
- 主要途经：广州 → 从化 → 韶关 → 郴州 → 长沙 → 武汉 → 西安
- 现代路线：主要沿京港澳高速、京珠高速和连霍高速行驶

### 数据结构
项目主要数据存储在 `data/lychee.geojson` 文件中，包含：
- 完整的路线坐标点
- 详细的中文路段描述
- 历史背景信息
- 现代路线对照说明

### 可视化效果
- 地图视角默认以广州为中心
- 采用 30° 倾斜角和俯仰角
- 初始观察距离为 2km
- 路线采用双线渲染：
  - 基础路线：浅蓝色（#87CEFA）
  - 动态飞线：红色（#ff0000）

## 目录结构
```
lychee/
├── data/
│   └── lychee.geojson  # 路线地理数据
├── src/
│   ├── Demo.jsx       # 主要展示组件
│   └── index.js       # 入口
├── webpack.config.js  # 构建配置
├── package.json      # 依赖
└── README.md         # 项目说明
```

## MCP 交互与数据生成流程
1. **地理编码与路线规划**：
   - 通过 MCP 地理编码接口获取起终点经纬度
   - 使用路线规划接口获取详细导航路径
2. **GeoJSON 数据生成**：
   - 将 MCP 返回的路径点序列转换为 GeoJSON LineString
   - 第三维高度统一设为 1，避免与底图重合
3. **前端可视化**：
   - 通过 `mapvthree.GeoJSONDataSource.fromURL` 加载 geojson 路线
   - 使用 `FatLine` 组件渲染主路线和动态飞线动画

## 注意事项
- 需替换 `Demo.jsx` 中 `mapvthree.BaiduMapConfig.ak` 为你自己的百度地图开发者密钥
- 路线数据如需更新，可重新调用 MCP API 生成 geojson
- 路线仅作历史参考，与实际古代驿道可能存在差异

## 参考资料
- [百度地图开放平台](https://lbsyun.baidu.com/)
- [JSAPI Three官方文档](https://lbsyun.baidu.com/faq/api?title=jsapithree)
- [百度MCP API文档](https://lbsyun.baidu.com/faq/api?title=mcpserver/base)
