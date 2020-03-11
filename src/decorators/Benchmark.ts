import { BenchmarkDriver } from '../BenchmarkDriver';

export interface BenchmarkOptions {
    name?: string;
    version?: string;
    description?: string;
    author?: string;
}

export function Benchmark(options?: BenchmarkOptions) {
    return (driver: typeof BenchmarkDriver) => {
        console.log('Driver: ', driver);
    };
}