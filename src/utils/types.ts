
export interface MeasurementResult {
    name: string;
    start: Date;
    end: Date;
    duration: number;
}

export interface BenchmarkResult extends MeasurementResult {
    measurementResults: MeasurementResult[];
}