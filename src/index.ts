import { BenchmarkData, generateAddresses } from './utils';
import runArangoBenchmark from './arango_benchmark';

const data: BenchmarkData = {
    accounts: [],
    profiles: [],
    addresses: [],
    relationships: []
};

const addrs = generateAddresses(10);
console.log(addrs);

runArangoBenchmark(data);
// runOrientBenchmark(data);