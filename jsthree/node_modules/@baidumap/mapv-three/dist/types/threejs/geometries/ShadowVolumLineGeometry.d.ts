export class ShadowVolumeLineGeometry {
    createVolumeGeometry(data: any, zoomUnit: any): any[][][];
    lineToShadowVolumeMesh(points: any, width: any): {
        vertices: any[];
        indices: any[];
        normals: any[];
        widths: any[];
    };
    _volumeSegmentLines: (positiveSeq: any, reverseSeq: any, widths: any, normals: any, indices: any, last: any, cur: any, next: any, width: any, index: any, isStarted: any) => number;
    conversion(baseArray: any, n: any): any[];
    _volumeExtrusions: (positiveSeq: any, reverseSeq: any, normals: any, widths: any, point: any, normal: any, width: any) => void;
}
