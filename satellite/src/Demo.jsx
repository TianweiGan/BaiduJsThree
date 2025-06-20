import React, { useRef, useEffect } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';

const Demo = () => {
    const ref = useRef();

    useEffect(() => {
        mapvthree.BaiduMapConfig.ak = '您的AK';

        const engine = new mapvthree.Engine(ref.current, {
            map: {
                provider: null,
                projection: 'ECEF',
                center: [116.327824, 39.901484],
                heading: 0,
                pitch: 0,
                range: 10000000,
            },
            rendering: {
                enableAnimationLoop: true,
            },
        });
        const mapView = new mapvthree.MapView();
        engine.add(mapView);
        mapView.addSurface(new mapvthree.RasterSurface(new mapvthree.CesiumTerrainTileProvider(), new mapvthree.BingImageryTileProvider()));

        engine.rendering.bloom.enabled = true;

        // 读取轨道数据
        fetch('data/route.geojson')
            .then(res => res.json())
            .then(json => {
                const features = json.features;
                const satellites = [];
                features.forEach((feature, i) => {
                    const coords = feature.geometry.coordinates;
                    // 画轨道线
                    const line = engine.add(new mapvthree.SimpleLine({
                        color: ['#00ffff', '#ff00ff', '#ffff00'][i % 3]
                    }));
                    let data = mapvthree.GeoJSONDataSource.fromGeoJSON(feature);
                    line.dataSource = data;
                    // 创建卫星
                    const geometry = new THREE.SphereGeometry(400000, 16, 16);
                    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: ['#00ffff', '#ff00ff', '#ffff00'][i % 3] });
                    const mesh = new THREE.Mesh(geometry, material);
                    satellites.push({ mesh, coords, t: 0 });
                    const first = coords[0];
                    const ecef = engine.map.projectArrayCoordinate(first, []);
                    mesh.position.set(ecef[0], ecef[1], ecef[2]);
                    engine.add(mesh);
                });
                // 动画：卫星沿轨道运动
                let running = true;
                function animate() {
                    if (!running) return;
                    satellites.forEach((sat, i) => {
                        sat.t = (sat.t + 0.2 + i * 0.01) % sat.coords.length;
                        const idx0 = Math.floor(sat.t);
                        let idx1 = (idx0 + 1) % sat.coords.length;
                        let p0 = sat.coords[idx0];
                        let p1 = sat.coords[idx1];
                        // 边界处理：如果idx0是最后一个点，idx1是0，且首尾点经纬度不同，则p1用p0
                        if (idx1 === 0 && (p0[0] !== p1[0] || p0[1] !== p1[1] || p0[2] !== p1[2])) {
                            p1 = p0;
                        }
                        const frac = sat.t - idx0;
                        const pos = [
                            p0[0] + (p1[0] - p0[0]) * frac,
                            p0[1] + (p1[1] - p0[1]) * frac,
                            p0[2] + (p1[2] - p0[2]) * frac,
                        ];
                        const ecef = engine.map.projectArrayCoordinate(pos, []);
                        sat.mesh.position.set(ecef[0], ecef[1], ecef[2]);
                    });
                    requestAnimationFrame(animate);
                }
                requestAnimationFrame(animate);
            });

        return () => {
            running = false;
            engine.dispose();
        };
    }, []);

    return <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />;
};

export default Demo;