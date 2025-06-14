export class WorkerService {
    constructor(url: any, options?: {});
    onMessage(e: any): void;
    name: any;
    type: any;
    worker: Worker;
    postMessage(data: any, transferList: any): void;
    terminate(): void;
}
