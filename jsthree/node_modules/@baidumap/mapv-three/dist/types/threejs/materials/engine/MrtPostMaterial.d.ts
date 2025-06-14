export class MrtPostMaterial {
    constructor(parameters: any);
    vertexShader: any;
    fragmentShader: any;
    uniforms: any;
    defines: {
        MVT_POST_ENABLE_BLOOM: boolean;
        MVT_POST_DEBUG_TEXTURE_COUNT: number;
        MVT_POST_USE_FOG: boolean;
        MVT_POST_ENABLE_COLOR_ADJUST: boolean;
        CUBEUV_TEXEL_WIDTH: number;
        CUBEUV_TEXEL_HEIGHT: number;
        CUBEUV_MAX_MIP: string;
    };
    dispose(): void;
}
