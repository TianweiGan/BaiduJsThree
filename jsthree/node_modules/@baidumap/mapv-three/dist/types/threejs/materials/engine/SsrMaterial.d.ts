export class SsrMaterial {
    constructor(parameters: any);
    vertexShader: any;
    fragmentShader: any;
    uniforms: any;
    defines: {
        MAX_STEP: number;
        PERSPECTIVE_CAMERA: boolean;
        DISTANCE_ATTENUATION: boolean;
        FRESNEL: boolean;
        INFINITE_THICK: boolean;
        SELECTIVE: boolean;
    };
    dispose(): void;
}
