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
                center: [116, 39],
                heading: 40,
                pitch: 80,
                range: 2000,
            },
            rendering: {
                sky: new mapvthree.DynamicSky(),
                enableAnimationLoop: true,
            },
        });

        const mapView = new mapvthree.MapView();
        engine.add(mapView);
        mapView.addSurface(new mapvthree.RasterSurface(new mapvthree.CesiumTerrainTileProvider(), new mapvthree.BingImageryTileProvider()));

        const weather = engine.add(new mapvthree.DynamicWeather(mapView));
        weather.weather = 'cloudy';
        weather.transitionDuration = 2000;

        return () => {
            engine.dispose();
        };
    }, []);

    return <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />;
};

export default Demo;