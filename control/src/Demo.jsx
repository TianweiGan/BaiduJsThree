import React, { useRef, useEffect } from 'react';
import * as mapvthree from '@baidumap/mapv-three';
import * as THREE from 'three';
import * as dat from 'dat.gui';

const Demo = () => {
    const ref = useRef();
    const guiRef = useRef();

    useEffect(() => {
        mapvthree.BaiduMapConfig.ak = '您的AK';

        const center = [120.213, 30.21, 0];
        const engine = new mapvthree.Engine(ref.current, {
            map: {
                provider: new mapvthree.BaiduVectorTileProvider(),
                center: center,
                pitch: 60,
                heading: 0,
                range: 50,
                projection: 'ECEF'
            },
            rendering: {
                enableAnimationLoop: true
            },
        });

        const model = new mapvthree.SimpleModel({
            name: 'bus',
            point: center,
            scale: 1,
            object: 'mapvthree/assets/models/twin/REALISTIC/BUS.glb',
        });
        engine.add(model);

        const transformControl = engine.selection.transformControl;
        transformControl.addEventListener('objectChange', e => {
            console.log('Model details changed:', e.target.object);
        });

        if (guiRef.current) {
            guiRef.current.destroy();
        }
        const gui = new dat.GUI();
        guiRef.current = gui;

        const events = {
            attach: () => {
                console.log('Attaching transform to model...');
                engine.selection.attachTransform(model);
            },
            detach: () => {
                console.log('Detaching transform...');
                engine.selection.detachTransform();
            },
            translate: () => {
                transformControl.setMode('translate');
            },
            scale: () => {
                transformControl.setMode('scale');
            },
            rotate: () => {
                transformControl.setMode('rotate');
            },
        };

        gui.add(events, 'attach').name('1. 附加控件 (Attach)');
        gui.add(events, 'detach').name('2. 分离控件 (Detach)');
        gui.add(events, 'translate').name('移动模式 (Translate)');
        gui.add(events, 'scale').name('缩放模式 (Scale)');
        gui.add(events, 'rotate').name('旋转模式 (Rotate)');
        ref.current.appendChild(gui.domElement);
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = '10px';
        gui.domElement.style.right = '10px';
        gui.domElement.style.zIndex = '9999';

        return () => {
            if (guiRef.current) {
                guiRef.current.destroy();
            }
            engine.dispose();
        };
    }, []);

    return <div ref={ref} style={{ width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0 }} />;
};

export default Demo;