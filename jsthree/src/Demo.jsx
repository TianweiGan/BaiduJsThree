import React, { useRef, useEffect } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';

const Demo = () => {
    const ref = useRef();

    useEffect(() => {
        mapvthree.BaiduMapConfig.ak = '您的AK';

        const engine = new mapvthree.Engine(ref.current, {
            map: {
                provider: new mapvthree.BaiduVectorTileProvider(),
                center: [105.943271, 29.348709],
                heading: 330,
                pitch: 60,
                range: 700,
            },
            rendering: {
                enableAnimationLoop: true,
            },
        });

        const exampleDataSource = new mapvthree.GeoJSONDataSource.fromGeoJSON({
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [105.941614, 29.347261],
                    },
                },
                {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: [105.941767, 29.352518],
                    },
                },
            ],
        });

        const examplePoint = engine.add(new mapvthree.Circle({
            size: 30,
        }));
        examplePoint.dataSource = exampleDataSource;

        let model = engine.add(new mapvthree.SimpleModel({
            name: 'model',
            point: [105.943667, 29.349341],
            url: 'assets/models/building/5_tiyuzhongxin.glb',
        }));

        examplePoint.addEventListener('click', (e) => {
            console.log(e);
        });

        return () => {
            engine.dispose();
        };
    }, []);

    return <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />;
};

export default Demo;