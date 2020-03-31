import {
    benchmark,
    measure,
    
    BenchmarkData,
    Account,
    Profile,
    ProfileCollection,
    Address,
} from './utils';
import {
    Database,
    DocumentCollection,
    EdgeCollection,
} from 'arangojs';
import * as $ from './compareableMeasurements';

export default async function(data: BenchmarkData) {
    await benchmark('ArangoDB', async () => {
        const con = new Database('tcp://127.0.0.1:8529');
        await con.useBasicAuth('root', 'graphdbbenchmark');
    
        const databaseName = 'benchmarkdb';
    
        await measure($.CreateNewDatabase, async () => {
            await con.createDatabase(databaseName);
            await con.useDatabase(databaseName);
        });

        const accountsCollectionName = 'accounts';
        const profilesCollectionName = 'profiles';
        const addressesCollectionName = 'addresses';

        let accountsCollection: DocumentCollection<Account>;
        let addressesCollection: DocumentCollection<Address>;
        let profilesCollection: DocumentCollection<ProfileCollection>;

        const accountResponses: any[] = [];
        const addressResponses: any[] = [];
        const profileResponses: any[] = [];

        await measure('Create collections', async () => {
            await Promise.all([
                (async () => {
                    accountsCollection = await con.collection(accountsCollectionName);
                    await accountsCollection.create();
                })(),

                (async () => {
                    addressesCollection = await con.collection(addressesCollectionName);
                    await addressesCollection.create();
                })(),
                
                (async () => {
                    profilesCollection = await con.collection(profilesCollectionName);
                    await profilesCollection.create();
                })(),
            ]);
        });

        await measure('Insert accounts in-turn', async () => {
            for (let acc of data.accounts) {
                const rsp = await accountsCollection.save(acc);
                accountResponses.push(rsp);
            }
        });

        console.log(accountResponses[0]);

        await measure('Insert addresses in-turn', async () => {
            for (let addr of data.addresses) {
                const rsp = await addressesCollection.save(addr);
                addressResponses.push(rsp);
            }
        });

        console.log(addressResponses[0]);

        await measure('Insert profiles in-turn', async () => {
            for (let profile of data.profiles) {
                const rsp = await profilesCollection.save({
                    account: accountResponses[profile.accountIndex],
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    gender: profile.gender,
                    birthdate: profile.birthdate,
                    address: profile.addressIndex && addressResponses[profile.addressIndex]
                });
                profileResponses.push(rsp);
            }
        });

        console.log(profileResponses[0]);

        await measure($.DropCreatedDatabase, async () => {
            // await con.useDatabase('_system');
            // await con.dropDatabase(databaseName)
        });
    });
}

