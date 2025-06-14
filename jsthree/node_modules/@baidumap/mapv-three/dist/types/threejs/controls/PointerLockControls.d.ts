export class PointerLockControls {
    constructor(camera: any, domElement: any);
    domElement: any;
    isLocked: boolean;
    minPolarAngle: number;
    maxPolarAngle: number;
    pointerSpeed: number;
    connect: () => void;
    disconnect: () => void;
    dispose: () => void;
    getObject: () => any;
    getDirection: (v: any) => any;
    moveForward: (distance: any) => void;
    moveRight: (distance: any) => void;
    lock: () => void;
    unlock: () => void;
}
