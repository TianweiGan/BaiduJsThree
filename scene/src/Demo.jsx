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
                center: [115, 39],
                pitch: 80,
                range: 1000,
                projection: 'ECEF',
            },
            rendering: {
                enableAnimationLoop: true,
                sky: new mapvthree.DynamicSky(),
            },
        });

        const mapView = new mapvthree.MapView();
        engine.add(mapView);
        mapView.addSurface(new mapvthree.RasterSurface(new mapvthree.CesiumTerrainTileProvider(), new mapvthree.BingImageryTileProvider()));

        const weather = engine.add(new mapvthree.DynamicWeather(mapView));
        weather.weather = 'cloudy';
        weather.transitionDuration = 2000;

        engine.add(new mapvthree.SimpleModel({
            name: 'model1',
            point: [115, 39],
            scale: new THREE.Vector3(1, 1, 1),
            object: 'mapvthree/assets/models/tree/tree18.glb',
        }));

        engine.add(new mapvthree.SimpleModel({
            name: 'model2',
            point: [115.001, 39.001],
            scale: new THREE.Vector3(1, 1, 1),
            object: 'mapvthree/assets/models/tree/tree19.glb',
        }));

        engine.add(new mapvthree.SimpleModel({
            name: 'model3',
            point: [115.002, 39.002],
            scale: new THREE.Vector3(1, 1, 1),
            object: 'mapvthree/assets/models/tree/planar/tree20.glb',
        }));

        engine.add(new mapvthree.SimpleModel({
            name: 'model4',
            point: [115.003, 39.002],
            scale: new THREE.Vector3(1, 1, 1),
            object: 'mapvthree/assets/models/hdmap/SM_Fence1-0.glb',
        }));

        engine.add(new mapvthree.SimpleModel({
            name: 'model5',
            point: [115.006, 39.005],
            scale: new THREE.Vector3(1, 1, 1),
            object: 'mapvthree/assets/models/city.glb',
        }));


        return () => {
            engine.dispose();
        };
    }, []);

    return <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />;
};

export default Demo;