import { BenchmarkData, generateAddresses, generateAccounts, generateProfiles, generateRelations, measure, BenchmarkResult, formatDuration } from './utils';
import runArangoBenchmark from './arango_benchmark';
import runOrientBenchmark from './orient_benchmark';


const printResultsTable = (...results: BenchmarkResult[]) => {
    const benchmarks: {[name: string]: {[name: string]: string}} = {};

    for (let r of results) {
        const propName = `${r.name} (${formatDuration(r.duration)} ms)`;
        benchmarks[propName] = {};

        for (let m of r.measurementResults) {
            benchmarks[propName][m.name] = formatDuration(m.duration) + ' ms';
        }
    }

    console.table(benchmarks);
};


(async () => {
    let data: BenchmarkData = { accounts: [], addresses: [], profiles: [], relations: [] };

    await measure('generate test data', async () => {
        const accounts = generateAccounts(10000);
        const addresses = generateAddresses(15000);
    
        const profiles = generateProfiles(accounts.length, addresses.length);

        const relations = generateRelations(50000, profiles.length);
    
        data = {
            accounts,
            addresses,
            profiles,
            relations
        };
    });

    const arangoResults = await runArangoBenchmark(data);
    const orientResults = await runOrientBenchmark(data);

    printResultsTable(arangoResults, orientResults);
})();