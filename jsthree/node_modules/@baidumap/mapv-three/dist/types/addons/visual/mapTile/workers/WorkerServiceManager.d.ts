export class WorkerServiceManeger {
    workerManager: Map<any, any>;
    workerSize: number;
    getWorkService(url: any): any;
    addWorkService(workService: any): void;
    returnWorker(url: any, workService: any): void;
    removeWorkService(workService: any): void;
}
