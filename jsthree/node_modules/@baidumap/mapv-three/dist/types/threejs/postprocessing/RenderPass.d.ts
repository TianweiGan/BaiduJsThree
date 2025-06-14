export class RenderPass {
    constructor(scene: any, camera: any, overrideMaterial: any, clearColor: any, clearAlpha: any);
    scene: any;
    camera: any;
    overrideMaterial: any;
    clearColor: any;
    clearAlpha: any;
    clear: boolean;
    clearDepth: boolean;
    needsSwap: boolean;
    _oldClearColor: any;
    _excludeElements: any[];
    _includeElements: any[];
    render(renderer: any, writeBuffer: any, readBuffer: any): void;
}
