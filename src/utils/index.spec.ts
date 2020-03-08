import {
    $log,
    formatDuration,
    benchmark
} from './index';

console.log = jest.fn();

describe('$log function', () => {
    it('should be a function', async () => {
        expect(typeof $log).toBe('function');
    });

    it('should expect at least one string parameter', async () => {
        $log('test string parameter');
    });

    it('should expect two parameters, where the second is of type Date', async () => {
        $log('test string parameter', new Date());
    });
});

describe('formatDuration function', () => {
    it('should be a function', async () => {
        expect(typeof formatDuration).toBe('function');
    });

    it('should return right value', async () => {
        expect(formatDuration(
            (1000 * 60 * 60 * 300) + // 300h
            (1000 * 60 * 74) + // 1h 14m
            (1000 * 66) + // 1m 6s
            2340 // 2s 340ms
        )).toBe('301:15:8.340');
    });
});

describe('benchmark function', () => {
    it('should be a function', async () => {
        expect(typeof benchmark).toBe('function');
    });

    it('should return a promise of the right type', async () => {
        const result = await benchmark('benchmark test', () => { });

        expect(typeof result).toBe('object');
        expect(result.start).toBeInstanceOf(Date);
        expect(result.end).toBeInstanceOf(Date);
        expect(typeof result.duration).toBe('number');
        expect(result.duration).toBeGreaterThanOrEqual(0.0);
    });
});