
export abstract class BenchmarkDriver {
    abstract createDatabase(): void;
    abstract createCollection(): void;
    abstract insertData(): void;
}