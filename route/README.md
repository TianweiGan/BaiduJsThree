# 基于Baidu JSAPI Three的路线规划可视化Demo

## 项目简介
本项目演示如何结合 [@baidumap/mapv-three](https://lbsyun.baidu.com/faq/api?title=jsapithree)（百度地图JSAPI Three）、Three.js 以及百度地图MCP服务，实现路线规划的三维可视化。你可以在三维地图上动态展示由 MCP 规划的路线（如北京一日游），并支持路线动画、可视化美化等效果。

## 效果截图
![路线可视化效果](image/image1.png)

## 环境准备
- Node.js
- Cursor

## 依赖安装
在 route 目录下执行：

```bash
# 安装核心依赖
npm install --save @baidumap/mapv-three three@0.158.0 react react-dom

# 安装开发与构建相关依赖
npm install --save-dev webpack webpack-cli copy-webpack-plugin html-webpack-plugin @babel/core @babel/preset-env @babel/preset-react babel-loader
```

## 资源与构建配置
本项目采用 Webpack 进行打包，静态资源（如地图底图、路线数据等）通过 CopyWebpackPlugin 自动拷贝到输出目录。

`webpack.config.js` 关键配置如下：
```js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'node_modules/@baidumap/mapv-three/dist/assets'),
                    to: 'mapvthree/assets',
                },
                {
                    from: path.resolve(__dirname, 'data'),
                    to: 'data',
                },
            ],
        }),
        new HtmlWebpackPlugin({
            templateContent: ({htmlWebpackPlugin}) => `
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <title>MapV Three Demo</title>
                    <script>
                        window.MAPV_BASE_URL = 'mapvthree/';
                    </script>
                </head>
                <body>
                    <h1>MapV Three Demo</h1>
                    <div id="container" style="width: 100vw; height: 100vh; position: fixed; left: 0; top: 0; margin: 0; padding: 0;"></div>
                </body>
                </html>
            `,
            inject: 'body',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            // 可根据需要添加loader配置
        ],
    },
    mode: 'development', // 可改为'production'
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}; 
```
- 路线数据文件 `route.geojson` 位于 `route/data/route.geojson`，打包后会自动复制到 `dist/data/route.geojson`，供前端可视化加载。
- 地图底图和三维资源自动拷贝到 `dist/mapvthree/assets`。

## 运行与构建

```bash
# 打包
npx webpack

# 生成的文件在 dist/ 目录下
# 用浏览器打开 dist/index.html 即可预览 Demo 效果
```

## 目录结构说明
```
route/
├── dist/                # 构建输出目录
│   ├── main.js
│   ├── index.html
│   ├── mapvthree/assets # 地图与模型等静态资源
│   └── data/route.geojson # 路线数据文件
├── image/               # 效果截图
├── node_modules/        # 依赖包
├── src/                 # 源码目录
│   ├── Demo.jsx         # Demo主组件，负责地图与路线渲染
│   └── index.js         # 入口文件
├── data/route.geojson   # 路线GeoJSON数据（编辑/替换此文件可自定义路线）
├── webpack.config.js    # 构建配置
├── package.json         # 项目依赖
└── README.md            # 项目说明
```

## 主要代码讲解

### 入口文件 `src/index.js`
```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import Demo from './Demo';

const root = createRoot(document.getElementById('container'));
root.render(<Demo />);
```
- 通过 React 的 `createRoot` API 挂载 `Demo` 组件。

### Demo 组件 `src/Demo.jsx`
该文件是整个地图应用的核心，负责三维地图初始化、路线加载与动画渲染。

```js
import React, { useRef, useEffect } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';

const Demo = () => {
    const ref = useRef();

    useEffect(() => {
        mapvthree.BaiduMapConfig.ak = '您的AK'; // 替换为你的百度地图开发者密钥

        const engine = new mapvthree.Engine(ref.current, {
            map: {
                provider: new mapvthree.BaiduVectorTileProvider(),
                projection: 'ECEF',
                center: [116.327824, 39.901484],
                heading: 40,
                pitch: 60,
                range: 2000,
            },
            rendering: {
                enableAnimationLoop: true,
            },
        });

        engine.rendering.bloom.enabled = true;
        
        const line = engine.add(new mapvthree.FatLine({
            lineWidth: 6,
            keepSize: true,
            color: '#87CEFA',
        }))
        
        const flyline = engine.add(new mapvthree.FatLine({
            color: '#ff0000',
            lineWidth: 6,
            keepSize: true,
            lineCap: 'round', 
            enableAnimation: true, // 是否开启线动画
            enableAnimationChaos: true, // 是否开启不规则动画
            animationTailType: 1, // 动画类型，1按线长度比例，需设置`animationTailRatio`属性，2按固定长度，需设置`animationTailLength`属性
            animationTailRatio: 0.2, // 拖尾动画长度比例
            animationIdle: 1000, // 拖尾动画间隔时间
            animationSpeed: 10,
            emissive: new THREE.Color(0xcf9c00),
        }));
        
        async function loadData() {
            const dataSource = await mapvthree.GeoJSONDataSource.fromURL('data/route.geojson');
            flyline.dataSource = dataSource;
            line.dataSource = dataSource;
        }
        loadData();

        return () => {
            engine.dispose();
        };
    }, []);

    return <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />;
};

export default Demo;
```
- 通过 `mapvthree.GeoJSONDataSource.fromURL('data/route.geojson')` 加载路线数据。
- 支持自定义路线：只需编辑 `data/route.geojson` 文件，格式为标准 GeoJSON LineString。

## 路线数据文件说明
- 路线数据文件为 `route/data/route.geojson`，格式为标准 GeoJSON。
- 你可以用 MCP 或其他方式生成路线坐标，直接替换 `coordinates` 数组内容。
- 构建后，前端通过 `data/route.geojson` 路径自动加载。

## 注意事项
- 你需要将 `src/Demo.jsx` 中 `mapvthree.BaiduMapConfig.ak` 的值替换为你的百度地图开发者密钥（AK）。
- 如何获取百度地图 AK？访问[百度地图开放平台-控制台](https://lbsyun.baidu.com/apiconsole/key)注册并创建应用获取（需选择浏览器端类型）。

## 参考资料
- [百度地图开放平台](https://lbsyun.baidu.com/)
- [JSAPI Three官方文档](https://lbsyun.baidu.com/faq/api?title=jsapithree)
