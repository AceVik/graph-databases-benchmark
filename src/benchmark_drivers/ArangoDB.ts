import { BenchmarkDriver } from '../BenchmarkDriver';
import { Benchmark, Measure } from '../decorators';

@Benchmark({
    name: "ArangoDB",
    version: "0.1",
    description: "Standart ArangoDB benchmark",
    author: "AceVik <mail@acevik.de>"
})
export class ArangoDB extends BenchmarkDriver {
    constructor() {
        super();
    }

    @Measure()
    createDatabase() {

    }

    @Measure()
    createCollection() {

    }

    @Measure()
    insertData() {

    }
}