export class AddTexturePass {
    uniforms: {
        tDiffuse: {
            value: null;
        };
        textureInfos: {
            value: null;
        };
        maps: {
            value: null;
        };
    };
    _lastTextureCount: number;
    material: any;
    needsSwap: boolean;
    fsQuad: any;
    render(renderer: any, writeBuffer: any, readBuffer: any): void;
    updateTextures(textures: any, infos: any): void;
    dispose(): void;
}
