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
                projection: 'ECEF',
                center: [116, 39],
                heading: 40,
                pitch: 0,
                range: 2000,
            },
            rendering: {
                enableAnimationLoop: true,
            },
        });

        return () => {
            engine.dispose();
        };
    }, []);

    return <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />;
};

export default Demo;