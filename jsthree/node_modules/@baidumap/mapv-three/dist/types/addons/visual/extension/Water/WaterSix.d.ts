/**
 * Work based on :
 * http://slayvin.net : Flat mirror for three.js
 * http://www.adelphi.edu/~stemkoski : An implementation of water shader based on the flat mirror
 * http://29a.ch/ && http://29a.ch/slides/2012/webglwater/ : WaterSix shader explanations in WebGL
 */
export class WaterSix {
    constructor(geometry: any, options?: {});
    material: any;
    p: any;
    far: number;
    step: number;
    onAfterRender: (renderer: any, scene: any, camera: any) => void;
    isWater: boolean;
}
