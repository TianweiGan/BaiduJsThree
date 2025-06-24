# Baidu JSAPI Three 登山路线可视化 Demo（climb）

## 项目简介
本项目演示如何基于 React + @baidumap/mapv-three + Three.js，在三维地球环境下可视化真实的登山路线（如泰山），并结合百度地图MCP（多云平台）API自动规划、生成和展示步行路线。

## 主要功能
- 通过 MCP API 自动获取真实可行走的登山路线（如泰安站-红门-玉皇顶、盘山登山道等），并生成标准 GeoJSON 路线数据。
- 使用 @baidumap/mapv-three 在三维地球上渲染路线，支持动态线条动画。
- 路线高度坐标统一设置为 1，避免与底图重合。

## MCP 交互与数据生成流程
1. **地理编码与POI检索**：
   - 通过 MCP 地理编码接口获取起点（如"泰安站"）和终点（如"泰山玉皇顶"）的经纬度。
   - 检索登山口、景区入口等关键节点，确保路线真实可走。
2. **步行路线规划**：
   - 使用 MCP 步行路线规划接口，获取详细的步行导航路径（包含每一步的经纬度坐标）。
   - 若需跨多个景区节点，分段调用API并拼接完整路线。
3. **GeoJSON 数据生成**：
   - 将 MCP 返回的路径点序列，统一转换为 GeoJSON LineString，第三维高度全部设为 1。
   - 结果写入 `climb/data/climb.geojson`，便于前端直接加载。
4. **前端可视化**：
   - 前端通过 `mapvthree.GeoJSONDataSource.fromURL` 加载 geojson 路线。
   - 使用 `FatLine` 组件渲染主路线和动态飞线动画。

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

## 目录结构
```
climb/
├── data/
│   └── climb.geojson   # 由MCP自动生成的登山路线数据
├── image/              # 效果截图
├── src/
│   ├── Demo.jsx        # 地球与路线可视化主组件
│   └── index.js        # 入口
├── webpack.config.js   # 构建配置
├── package.json        # 依赖
└── README.md           # 项目说明
```

## 主要代码说明
- `src/Demo.jsx`：
  - 初始化三维地球，设置百度地图AK。
  - 加载 climb.geojson 路线，使用 FatLine 渲染主线和动态飞线。
- `climb/data/climb.geojson`：
  - 由 MCP 步行路线API自动生成，包含完整的登山路线坐标。

## MCP 路线生成示例（以泰山为例）
1. 地理编码获取"泰安站"与"泰山玉皇顶"经纬度。
2. 步行路线规划API获取从泰安站-红门-玉皇顶的详细步行路径。
3. 路径点序列转为GeoJSON，第三维全部为1。
4. 前端加载并渲染。

## 注意事项
- 需替换 `Demo.jsx` 中 `mapvthree.BaiduMapConfig.ak` 为你自己的百度地图开发者密钥。
- 路线数据如需更新，可重新调用 MCP API 生成 climb.geojson。

## 参考资料
- [百度地图开放平台](https://lbsyun.baidu.com/)
- [JSAPI Three官方文档](https://lbsyun.baidu.com/faq/api?title=jsapithree)
- [百度MCP API文档](https://lbsyun.baidu.com/faq/api?title=mcpserver/base)
