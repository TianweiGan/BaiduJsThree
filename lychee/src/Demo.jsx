import React, { useRef, useEffect, useState } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import runningManModel from '../public/models/running_man.glb';

const Demo = () => {
    const ref = useRef();
    const [mapType, setMapType] = useState('satellite');

    useEffect(() => {
        mapvthree.BaiduMapConfig.ak = 'a2XkTGoOtUZoA03439QtWYQBs5skl8My';
        mapvthree.CesiumConfig.accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZWY3Yjk2Ny02MWZlLTQ5ZmQtYTgwZi00NzdiYWQ1NjgyZWEiLCJpZCI6MzE1MDY1LCJpYXQiOjE3NTA3NDU5OTF9.0iYwpAWe3_2FkAokyfc1goxXE_Rs6-OwIDJCA1Y7dH0';

        const engine = new mapvthree.Engine(ref.current, {
            map: {
                provider: mapType === 'satellite' ? new mapvthree.BingImageryTileProvider() : new mapvthree.BaiduVectorTileProvider(),
                center: [113.27143, 23.13534],
                heading: 30,
                pitch: 60,  // 增加俯仰角以更好地观察地形
                range: 2000,
                projection: 'EPSG:3857',
            },
            rendering: {
                enableAnimationLoop: true,
            },
        });
/*
        let mapView = engine.add(new mapvthree.MapView({
            terrainProvider: new mapvthree.CesiumTerrainTileProvider(),
            imageryProvider: new mapvthree.BingImageryTileProvider(),
        }));
*/
        const line = engine.add(new mapvthree.FatLine({
            lineWidth: 6,
            keepSize: true,
            color: '#87CEFA',
        }));
        
        const flyline = engine.add(new mapvthree.FatLine({
            color: '#ff0000',
            lineWidth: 6,
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
        const MOVEMENT_SPEED = 100;     // 移动速度
        const CAMERA_DISTANCE = 70;    // 后方距离
        const CAMERA_HEIGHT = 50;      // 相机高度
        const CAMERA_OFFSET = 0;       // 相机水平偏移
        const CAMERA_SMOOTH = 0.05;    // 相机平滑系数
        const MAX_DELTA_TIME = 0.05;   // 最大时间步长（秒）
        
        let lastTime = performance.now();
        let currentCameraPos = null;
        let lastModelPos = new THREE.Vector3();  // 缓存模型位置
        let lastModelAngle = 0;                  // 缓存模型角度
        
        let mixer; // 动画混合器
        let model; // 3D模型
        const modelScale = 2; // 模型缩放比例
        
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
                
                // 计算目标位置
                const targetX = currentPosOutput[0] + (nextPosOutput[0] - currentPosOutput[0]) * progress;
                const targetY = currentPosOutput[1] + (nextPosOutput[1] - currentPosOutput[1]) * progress;
                const baseZ = currentPosOutput[2];
                
                // 计算目标角度
                const direction = new THREE.Vector3(
                    nextPosOutput[0] - currentPosOutput[0],
                    nextPosOutput[1] - currentPosOutput[1],
                    0
                ).normalize();
                const targetAngle = Math.atan2(direction.y, direction.x) + Math.PI / 2;
                
                // 平滑插值到新位置和角度
                if (lastModelPos.x === 0 && lastModelPos.y === 0 && lastModelPos.z === 0) {
                    lastModelPos.set(targetX, targetY, baseZ);
                    lastModelAngle = targetAngle;
                } else {
                    lastModelPos.x += (targetX - lastModelPos.x) * 0.1;
                    lastModelPos.y += (targetY - lastModelPos.y) * 0.1;
                    lastModelPos.z = baseZ;
                    
                    // 处理角度插值，考虑角度的循环性
                    let angleDiff = targetAngle - lastModelAngle;
                    if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                    if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                    lastModelAngle += angleDiff * 0.1;
                }
                
                if (model) {
                    // 应用平滑后的位置和角度
                    model.position.copy(lastModelPos);
                    model.rotation.set(0, 0, 0);
                    model.rotateZ(lastModelAngle);
                    model.rotateX(Math.PI / 2);
                }

                // 使用平滑后的位置计算相机位置
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
                
                // 当进度达到1时，移动到下一个点
                if (progress >= 1) {
                    progress = 0;
                    currentPointIndex = nextIndex;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        async function loadData() {
            try {
                const dataSource = await mapvthree.GeoJSONDataSource.fromURL('data/lychee.geojson');
                flyline.dataSource = dataSource;
                line.dataSource = dataSource;

                // 获取路线数据
                const response = await fetch('data/lychee.geojson');
                const json = await response.json();
                coords = json.features[0].geometry.coordinates;
                
                // 开始动画
                animate();
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
    }, [mapType]);

    return (
        <>
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                background: 'white',
                padding: '10px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
                <button 
                    onClick={() => setMapType(mapType === 'satellite' ? 'vector' : 'satellite')}
                    style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: 'white'
                    }}
                >
                    切换到{mapType === 'satellite' ? '矢量图' : '卫星图'}
                </button>
            </div>
            <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />
        </>
    );
};

export default Demo;