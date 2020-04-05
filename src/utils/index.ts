export * from './types';
export * from './entities';
export * from './builders';

import format from 'date-fns/format';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import { MeasurementResult, BenchmarkResult } from './types';

// returns duration formated as: h:m:s.ms
export function formatDuration(duration: number): string {
    let seconds = Math.floor(duration * 0.001);
    const milliseconds = duration - (seconds * 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - (minutes * 60);
    const hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function $log(text: string, ts: Date = new Date()) {
    console.log(`[${format(ts, 'yyyy-MM-dd HH:mm:ss.SS')}] ${text}`);
}


const benchmarks = new Map<string, MeasurementResult[]>();
let currentBenchmark: string | undefined = undefined;

export async function benchmark(name: string, run: Function, verbose?: boolean): Promise<BenchmarkResult> {
    verbose !== false && $log(`Start benchmark "${name}"`);

    currentBenchmark = name;
    benchmarks.set(name, []);

    const start = new Date();

    await run();

    const end = new Date();
    const duration = differenceInMilliseconds(end, start);

    currentBenchmark = undefined;

    verbose !== false && $log(`Benchmark "${name}" finished in ${formatDuration(duration)}`);

    return {
        name,
        duration,
        start,
        end,
        measurementResults: benchmarks.get(name)!
    };
}

export async function measure(name: string, run: Function, verbose?: boolean): Promise<MeasurementResult> {
    const prefix = currentBenchmark ? `\t` : '';

    verbose !== false && $log(`${prefix}Measure "${name}"`);

    const start = new Date();

    await run();

    const end = new Date();
    const duration = differenceInMilliseconds(end, start);

    verbose !== false && $log(`${prefix}✓ "${name}" finished in ${formatDuration(duration)}`, end);

    const result = {
        name,
        start,
        end,
        duration
    };

    if (currentBenchmark) {
        benchmarks.get(currentBenchmark)?.push(result);
    }

    return result;
}