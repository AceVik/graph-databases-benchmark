import { BenchmarkData, generateAddresses, generateAccounts, generateProfiles, measure } from './utils';
import runArangoBenchmark from './arango_benchmark';

(async () => {
    let data: BenchmarkData = { accounts: [], addresses: [], profiles: [] };

    await measure('generate test data', async () => {
        const accounts = generateAccounts(750000);
        const addresses = generateAddresses(1250000);
    
        const profiles = generateProfiles(accounts.length, addresses.length);
    
        data = {
            accounts,
            addresses,
            profiles
        };
    });

    runArangoBenchmark(data);
    // runOrientBenchmark(data);
})();