# MCP+JS实现动态路线展示+视角跟随

## 项目简介
本项目基于 React + @baidumap/mapv-three + Three.js 实现了《长安的荔枝》中广州至从化的荔枝运输路线3D可视化展示。项目支持在百度矢量地图和Bing卫星地图之间切换，并通过3D人物模型动态展示运输过程。

## 主要功能
- 支持百度矢量地图和Bing卫星地图的切换显示
- 使用3D人物模型沿路线动态移动
- 智能相机跟随系统，提供最佳观察视角
- 路线采用动态发光效果展示
- Web Mercator (EPSG:3857) 投影支持，确保多地图源兼容性

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

## 路线说明

### 路线概述
- 起点：广州市越秀区
- 终点：从化区
- 主要途经：广州北环高速 → 机场高速 → 大广高速
- 路线特点：全程按照实际道路规划，主要通过高速公路网络连接

### 数据结构
项目主要数据存储在 `data/lychee.geojson` 文件中，包含：
- 完整的路线坐标点序列
- 详细的路段描述
- 路线说明和数据来源信息

### 3D可视化效果
- 地图默认以广州为中心
- 采用 30° 倾斜角和 60° 俯仰角
- 初始观察距离为 2km
- 可视化元素：
  - 基础路线：浅蓝色发光效果
  - 动态飞线：红色动画效果
  - 3D人物模型：动态奔跑动画

## 目录结构
```
lychee/
├── data/
│   └── lychee.geojson     # 路线地理数据
├── public/
│   └── models/
│       └── running_man.glb # 3D人物模型
├── src/
│   ├── Demo.jsx           # 主要展示组件
│   └── index.js           # 入口文件
├── webpack.config.js      # 构建配置
├── package.json          # 项目依赖
└── README.md             # 项目说明
```

## 技术实现细节

### 地图系统
- 支持在百度矢量地图和Bing卫星地图间无缝切换
- 使用 EPSG:3857 (Web Mercator) 投影确保地图兼容性
- 通过 `projectArrayCoordinate` 进行坐标投影转换

### 3D模型集成
- 使用 GLTFLoader 加载 .glb 格式的3D人物模型
- 实现模型动画混合器处理走路动画
- 智能调整模型朝向，确保始终面向运动方向

### 相机系统
- 实现智能相机跟随系统
- 保持适当的观察距离和高度
- 平滑的相机运动效果
- 自动调整视角以获得最佳观察效果

## 配置说明
项目运行需要配置以下密钥：
- 百度地图开发者密钥 (ak)
- Cesium ion 访问令牌 (accessToken)

请在 `Demo.jsx` 中替换为你自己的密钥：
```javascript
mapvthree.BaiduMapConfig.ak = '你的百度地图密钥';
mapvthree.CesiumConfig.accessToken = '你的Cesium ion密钥';
```

## 参考资料
- [百度地图开放平台](https://lbsyun.baidu.com/)
- [JSAPI Three官方文档](https://lbsyun.baidu.com/faq/api?title=jsapithree)
- [百度MCP API文档](https://lbsyun.baidu.com/faq/api?title=mcpserver/base)
