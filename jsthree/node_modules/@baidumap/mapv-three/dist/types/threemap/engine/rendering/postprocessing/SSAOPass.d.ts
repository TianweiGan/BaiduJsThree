export class SSAOPass {
    constructor(width: any, height: any);
    width: any;
    height: any;
    clear: boolean;
    kernelRadius: number;
    kernelSize: number;
    kernel: any[];
    noiseTexture: any;
    intensity: number;
    minDistance: number;
    maxDistance: number;
    ssaoMaterial: any;
    blurMaterial: any;
    copyMaterial: any;
    fsQuad: any;
    originalClearColor: any;
    needsNormalTexture: boolean;
    needsDepthTexture: boolean;
    dispose(): void;
    render(renderer: any, writeBuffer: any, readBuffer: any): void;
    ssaoRenderTarget: any;
    blurRenderTarget: any;
    renderPass(renderer: any, passMaterial: any, renderTarget: any, clearColor: any, clearAlpha: any): void;
    setSize(width: any, height: any): void;
    generateSampleKernel(): void;
    generateRandomKernelRotations(): void;
}
