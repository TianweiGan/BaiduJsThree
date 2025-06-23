import React, { useRef, useEffect, useState } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';

// provider 选项
const PROVIDERS = [
    { label: 'Bing影像', value: 'bing' },
    { label: '百度矢量', value: 'baidu' },
    { label: '无底图', value: 'none' },
];

const WALL_COLOR = '#0DCCFF';

const Demo = () => {
    const ref = useRef();
    const [provider, setProvider] = useState('bing');
    const engineRef = useRef();

    useEffect(() => {
        mapvthree.BaiduMapConfig.ak = '您的AK';

        // provider 实例
        let providerInstance = null;
        if (provider === 'bing') {
            providerInstance = new mapvthree.BingImageryTileProvider();
        } else if (provider === 'baidu') {
            providerInstance = new mapvthree.BaiduVectorTileProvider();
        } else {
            providerInstance = null;
        }

        // 创建引擎
        const engine = new mapvthree.Engine(ref.current, {
            map: {
                provider: providerInstance,
                projection: 'ECEF',
                center: [116.41439809344809, 40.08866668808574],
                pitch: 0, 
                range: 100000, 
            },
            rendering: {
                sky: null,
                enableAnimationLoop: true,
            },
        });
        engineRef.current = engine;
        engine.rendering.bloom.enabled = true;

        // 1. 绘制北京市总轮廓
        fetch('mapvthree/assets/geojson/polygon.geojson')
            .then(rs => rs.json())
            .then(rs => {
                const data = mapvthree.geojsonUtils.convertPolygon2LineString(rs);
                const wall = engine.add(
                    new mapvthree.Wall({
                        height: 5000,
                        color: WALL_COLOR,
                        enableAnimation: true,
                        animationTailType: 3,
                        animationSpeed: 1,
                        opacity: 0.5,
                    })
                );
                wall.dataSource = mapvthree.GeoJSONDataSource.fromGeoJSON(data);
            });

        // 2. 绘制各区轮廓
        fetch('mapvthree/assets/geojson/polygon_districts.geojson')
            .then(rs => rs.json())
            .then(rs => {
                if (rs && rs.features) {
                    rs.features.forEach((feature) => {
                        const data = mapvthree.geojsonUtils.convertPolygon2LineString({
                            type: 'FeatureCollection',
                            features: [feature],
                        });
                        const wall = engine.add(
                            new mapvthree.Wall({
                                height: 5000,
                                color: WALL_COLOR,
                                enableAnimation: true,
                                animationTailType: 3,
                                animationSpeed: 1,
                                opacity: 0.5,
                            })
                        );
                        wall.dataSource = mapvthree.GeoJSONDataSource.fromGeoJSON(data);
                    });
                }
            });

        // 地图点击事件
        engine.map.addEventListener('click', e => {
            console.log('点击坐标:', e.point);
        });

        return () => {
            engine.dispose();
        };
    }, [provider]);

    // provider 切换控件（右上角）
    return (
        <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
            <div style={{ position: 'absolute', zIndex: 10, right: 20, top: 20, background: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 4 }}>
                <label>底图选择：</label>
                <select value={provider} onChange={e => setProvider(e.target.value)}>
                    {PROVIDERS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Demo;