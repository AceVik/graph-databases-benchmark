
import format from 'date-fns/format';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

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

export async function benchmark(name: string, run: Function): Promise<any> {
    $log(`Start of "${name}"`);

    const start = new Date();

    await run();

    const end = new Date();
    const duration = differenceInMilliseconds(end, start);

    $log(`"${name}" finished in ${formatDuration(duration)}`, end);

    return {
        name,
        start,
        end,
        duration
    };
}