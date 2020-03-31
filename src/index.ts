import { BenchmarkData, generateAddresses, generateAccounts, generateProfiles } from './utils';
import runArangoBenchmark from './arango_benchmark';

const data: BenchmarkData = {
    accounts: [],
    profiles: [],
    addresses: [],
    relationships: []
};

// const addrs = generateAddresses(10);

const accs = generateAccounts(50);
const addrs = generateAddresses(50);

const profiles = generateProfiles(accs.length, addrs.length);

runArangoBenchmark(data);
// runOrientBenchmark(data);