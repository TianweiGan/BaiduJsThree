export class Snow {
    constructor(renderer: any, camera: any);
    _renderer: any;
    _camera: any;
    _clock: any;
    _system: any;
    _emitter: any;
    update: () => void;
    createSnow: () => any;
    createEmitter: () => any;
    dispose(): void;
}
