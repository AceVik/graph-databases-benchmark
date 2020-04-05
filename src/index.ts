import { BenchmarkData, generateAddresses, generateAccounts, generateProfiles, generateRelations, measure } from './utils';
import runArangoBenchmark from './arango_benchmark';
import runOrientBenchmark from './orient_benchmark';

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
})();