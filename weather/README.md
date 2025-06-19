# 基于Baidu JSAPI Three的地球天气可视化Demo

## 项目简介
本项目旨在演示如何在 React 环境下，结合 [@baidumap/mapv-three](https://lbsyun.baidu.com/faq/api?title=jsapithree) 和 Three.js，在一个三维地球仪上实现动态天气效果（如多云天空），并能像地球仪一样自由旋转和缩放的地图应用。

## 效果截图
![效果图1](image/image1.png)
![效果图2](image/image2.png)


## 环境准备
- Node.js
- VSCode

## 依赖安装
在项目根目录下依次执行：

```bash
# 安装核心依赖
npm install --save @baidumap/mapv-three three@0.158.0 react react-dom

# 安装开发与构建相关依赖
npm install --save-dev webpack webpack-cli copy-webpack-plugin html-webpack-plugin @babel/core @babel/preset-env @babel/preset-react babel-loader
```

## 资源与构建配置
本项目采用 Webpack 进行打包，静态资源（如地图底图、3D模型等）通过 CopyWebpackPlugin 自动拷贝到输出目录。

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
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    mode: 'development', 
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
```

## 运行与构建

```bash
# 打包
npx webpack

# 生成的文件在 dist/ 目录下
# 用浏览器打开 dist/index.html 即可预览 Demo 效果
```

## 目录结构说明
```
weather/
├── dist/                # 构建输出目录
│   ├── main.js
│   ├── index.html
│   └── mapvthree/assets # 地图与模型等静态资源
├── image/               # 效果截图
├── node_modules/        # 依赖包
├── src/                 # 源码目录
│   ├── Demo.jsx         # Demo主组件
│   └── index.js         # 入口文件
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

### `Demo` 组件 `src/Demo.jsx`
该文件是整个地图应用的核心，负责地球仪的初始化和动态天气效果的集成。

```js
import React, { useRef, useEffect } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';

const Demo = () => {
    const ref = useRef();

    useEffect(() => {
        // 设置百度地图开发者密钥（AK）
        mapvthree.BaiduMapConfig.ak = '您的AK'; // 替换为您的实际AK

        // 初始化三维地图引擎
        const engine = new mapvthree.Engine(ref.current, {
            map: {
                provider: null, // s设置为null
                projection: 'ECEF',
                center: [116, 39],
                heading: 40,
                pitch: 80,
                range: 2000,
            },
            rendering: {
                sky: new mapvthree.DynamicSky(), // 添加动态天空效果
                enableAnimationLoop: true,
            },
        });

        const mapView = new mapvthree.MapView();
        engine.add(mapView);
        mapView.addSurface(new mapvthree.RasterSurface(new mapvthree.CesiumTerrainTileProvider(), new mapvthree.BingImageryTileProvider()));

        // 添加动态天气效果
        const weather = engine.add(new mapvthree.DynamicWeather(mapView));
        weather.weather = 'cloudy'; // 设置天气类型为多云
        weather.transitionDuration = 2000; // 设置天气过渡动画时长

        // 组件卸载时释放资源
        return () => {
            engine.dispose();
        };
    }, []);

    // 容器div全屏展示地图
    return <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />;
};

export default Demo;
```

## 注意！
您需要将 `src/Demo.jsx` 中 `mapvthree.BaiduMapConfig.ak` 的值替换为您的百度地图开发者密钥（AK）。
- **Q: 如何获取百度地图 AK？**
- A: 访问[百度地图开放平台-控制台](https://lbsyun.baidu.com/apiconsole/key)注册并创建应用获取（要创建浏览器端类型）。

## 参考资料
- [百度地图开放平台](https://lbsyun.baidu.com/)
- [JSAPI Three官方文档](https://lbsyun.baidu.com/faq/api?title=jsapithree)
