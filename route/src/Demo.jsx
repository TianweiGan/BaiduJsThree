import React, { useRef, useEffect } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';

const Demo = () => {
    const ref = useRef();

    useEffect(() => {
        mapvthree.BaiduMapConfig.ak = 'a2XkTGoOtUZoA03439QtWYQBs5skl8My';

        const engine = new mapvthree.Engine(ref.current, {
            map: {
                provider: new mapvthree.BaiduVectorTileProvider(),
                projection: 'ECEF',
                center: [104.049392, 30.648245],
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
            const dataSource = await mapvthree.GeoJSONDataSource.fromURL('data/heart.geojson');
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