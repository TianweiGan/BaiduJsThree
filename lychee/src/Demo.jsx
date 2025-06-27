import React, { useRef, useEffect, useState } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import runningManModel from '../public/models/running_man.glb';
import * as Cesium from 'cesium';

const Demo = () => {
    const ref = useRef();
    // const [mapType, setMapType] = useState('satellite');

    useEffect(() => {
        mapvthree.BaiduMapConfig.ak = '您的AK';
        mapvthree.CesiumConfig.accessToken = '您的AK';

        const engine = new mapvthree.Engine(ref.current, {
            map: {
                // provider: mapType === 'satellite' ? new mapvthree.BingImageryTileProvider() : new mapvthree.BaiduVectorTileProvider(),
                provider: null,
                center: [113.27345, 23.13538],
                heading: 0,
                pitch: 60,  // 增加俯仰角以更好地观察地形
                range: 2000,
                projection: 'EPSG:4326',
            },
            rendering: {
                enableAnimationLoop: true,
            },
        });

        let terrain = new mapvthree.CesiumTerrainTileProvider();
        let imagery = new mapvthree.BingImageryTileProvider();
        let vector = new mapvthree.BaiduVectorTileProvider();
        engine.add(new mapvthree.MapView({
            terrainProvider: terrain,
            imageryProvider: imagery,
            vectorProvider: null,
        }));
        console.log('terrainProvider:', terrain);
        console.log('imageryProvider:', imagery);
        console.log('vectorProvider:', vector);

        const line = engine.add(new mapvthree.FatLine({
            lineWidth: 10,
            keepSize: true,
            color: '#87CEFA',
        }));
        
        const flyline = engine.add(new mapvthree.FatLine({
            color: '#ff0000',
            lineWidth: 10,
            keepSize: true,
            lineCap: 'round', 
            enableAnimation: true,
            enableAnimationChaos: true,
            animationTailType: 1,
            animationTailRatio: 0.2,
            animationIdle: 1000,
            animationSpeed: 1000,
            emissive: new THREE.Color(0xcf9c00),
        }));

        let animationFrameId;
        let currentPointIndex = 0;
        let coords;
        let progress = 0;
        const MOVEMENT_SPEED = 300;     // 移动速度
        const CAMERA_DISTANCE = 500;    // 后方距离
        const CAMERA_HEIGHT = 300;      // 相机高度
        const CAMERA_OFFSET = 0;       // 相机水平偏移
        const CAMERA_SMOOTH = 0.05;    // 相机平滑系数
        const MAX_DELTA_TIME = 0.05;   // 最大时间步长（秒）
        
        let lastTime = performance.now();
        let currentCameraPos = null;
        let lastModelPos = new THREE.Vector3();  // 缓存模型位置
        let lastModelAngle = 0;                  // 缓存模型角度
        
        let mixer; // 动画混合器
        let model; // 3D模型
        const modelScale = 20; // 模型缩放比例
        const map_bias_x = 0.0118; // 经度偏移
        const map_bias_y = 0.0028; // 纬度偏移
        
        // 加载3D模型
        const loader = new GLTFLoader();
        console.log('开始加载模型...');
        loader.load(runningManModel, (gltf) => {
            console.log('模型加载成功:', gltf);
            model = gltf.scene;
            model.scale.set(modelScale, modelScale, modelScale);
            
            // 创建动画混合器
            mixer = new THREE.AnimationMixer(model);
            console.log('动画数量:', gltf.animations.length);
            
            // 播放所有动画
            if (gltf.animations.length > 0) {
                const runAction = mixer.clipAction(gltf.animations[0]);
                runAction.play();
            }
            
            engine.add(model);
        }, 
        // 加载进度回调
        (progress) => {
            console.log('加载进度:', (progress.loaded / progress.total * 100) + '%');
        },
        // 错误回调
        (error) => {
            console.error('模型加载错误:', error);
        });

        function animate() {
            const currentTime = performance.now();
            const deltaTime = Math.min((currentTime - lastTime) / 1000, MAX_DELTA_TIME);
            lastTime = currentTime;

            if (coords && coords.length > 0 && model) {
                if (mixer) {
                    mixer.update(deltaTime);
                }

                let currentPosOutput = [];
                engine.map.projectArrayCoordinate(coords[currentPointIndex], currentPosOutput);
                const nextIndex = (currentPointIndex + 1) % coords.length;
                let nextPosOutput = [];
                engine.map.projectArrayCoordinate(coords[nextIndex], nextPosOutput);
                
                const distance = Math.sqrt(
                    Math.pow(nextPosOutput[0] - currentPosOutput[0], 2) +
                    Math.pow(nextPosOutput[1] - currentPosOutput[1], 2)
                );

                const progressDelta = Math.min((MOVEMENT_SPEED * deltaTime) / distance, 0.1);
                progress += progressDelta;
                
                const targetX = currentPosOutput[0] + (nextPosOutput[0] - currentPosOutput[0]) * progress;
                const targetY = currentPosOutput[1] + (nextPosOutput[1] - currentPosOutput[1]) * progress;
                
                // 使用真实高程数据进行插值
                const currentHeight = coords[currentPointIndex][2];
                const nextHeight = coords[nextIndex][2];
                const targetZ = currentHeight + (nextHeight - currentHeight) * progress;
                
                const direction = new THREE.Vector3(
                    nextPosOutput[0] - currentPosOutput[0],
                    nextPosOutput[1] - currentPosOutput[1],
                    0
                ).normalize();
                const targetAngle = Math.atan2(direction.y, direction.x) + Math.PI / 2;
                
                if (lastModelPos.x === 0 && lastModelPos.y === 0 && lastModelPos.z === 0) {
                    lastModelPos.set(targetX, targetY, targetZ);
                    lastModelAngle = targetAngle;
                } else {
                    lastModelPos.x += (targetX - lastModelPos.x) * 0.1;
                    lastModelPos.y += (targetY - lastModelPos.y) * 0.1;
                    lastModelPos.z = targetZ;
                    
                    let angleDiff = targetAngle - lastModelAngle;
                    if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                    if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                    lastModelAngle += angleDiff * 0.1;
                }
                
                if (model) {
                    model.position.copy(lastModelPos);
                    model.rotation.set(0, 0, 0);
                    model.rotateZ(lastModelAngle);
                    model.rotateX(Math.PI / 2);
                }

                const targetCameraPos = new THREE.Vector3(
                    lastModelPos.x - direction.x * CAMERA_DISTANCE + direction.y * CAMERA_OFFSET,
                    lastModelPos.y - direction.y * CAMERA_DISTANCE - direction.x * CAMERA_OFFSET,
                    lastModelPos.z + CAMERA_HEIGHT
                );

                if (!currentCameraPos) {
                    currentCameraPos = targetCameraPos.clone();
                }

                currentCameraPos.lerp(targetCameraPos, CAMERA_SMOOTH);

                engine.camera.position.copy(currentCameraPos);
                engine.camera.lookAt(lastModelPos.x, lastModelPos.y, lastModelPos.z + 5);
                engine.camera.up.set(0, 0, 1);
                
                if (progress >= 1) {
                    progress = 0;
                    currentPointIndex = nextIndex;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        async function loadData() {
            try {
                // 读取geojson文件
                const response = await fetch('data/lychee.geojson');
                const geojsonData = await response.json();

                // 设定高程
                const terrainProvider = await Cesium.createWorldTerrainAsync();
                // 将坐标转换为Cartographic对象列表
                const positions = geojsonData.features[0].geometry.coordinates.map(coord => 
                    Cesium.Cartographic.fromDegrees(coord[0], coord[1])
                );
                try {
                    const updatedPositions = await Cesium.sampleTerrainMostDetailed(terrainProvider, positions, true);
                    // 更新geojson中的坐标，添加高程信息
                    geojsonData.features[0].geometry.coordinates = geojsonData.features[0].geometry.coordinates.map((coord, index) => {
                        return [coord[0]- map_bias_x, coord[1]- map_bias_y, updatedPositions[index].height + 25];
                    });
                    console.log(geojsonData.features[0].geometry.coordinates);
                }
                catch (error) {
                    console.error('Error sampling terrain:', error);
                }

                // 使用修改后的geojson数据创建数据源
                const dataSource = mapvthree.GeoJSONDataSource.fromGeoJSON(geojsonData);
                flyline.dataSource = dataSource;
                line.dataSource = dataSource;

                // 保存坐标数据用于动画
                coords = geojsonData.features[0].geometry.coordinates;

                // 延时2秒后开始动画，等待底图渲染
                console.log('等待2秒让底图渲染...');
                setTimeout(() => {
                    console.log('开始动画');
                    animate();
                }, 3000);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        }

        loadData();

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (mixer) {
                mixer.stopAllAction();
            }
            engine.dispose();
        };
    }, []);

    return (
            <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />
    );
};

export default Demo;