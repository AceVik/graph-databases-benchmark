import {
    benchmark,
    measure,
    
    BenchmarkData,
    Account,
    Profile,
    Address,
    Relationship
} from './utils';
import {
    Database,
    DocumentCollection,
    EdgeCollection
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
        const relationshipsCollectionName = 'relationships';

        let accountsCollection: DocumentCollection<Account>;
        let profilesCollection: DocumentCollection<Profile>;
        let addressesCollection: DocumentCollection<Address>;
        let relationshipsCollection: EdgeCollection<Relationship>;

        await measure('Create collections', async () => {
            await Promise.all([
                (async () => {
                    accountsCollection = await con.collection(accountsCollectionName);
                    await accountsCollection.create();
                })(),

                (async () => {
                    profilesCollection = await con.collection(profilesCollectionName);
                    await profilesCollection.create();
                })(),

                (async () => {
                    addressesCollection = await con.collection(addressesCollectionName);
                    await addressesCollection.create();
                })(),

                (async () => {
                    relationshipsCollection = await con.edgeCollection(relationshipsCollectionName);
                    await relationshipsCollection.create();
                })()
            ]);
        });

        await measure('Insert benchmark data', async () => {
            const doc = await accountsCollection.save({
                mail: 'test@acevik.de',
                password: 'qwer66tzui',
                createdAt: new Date(),
                token: 'sdgfdsfgdfhgdhgh'
            });

            console.log(doc);
        });

        await measure($.DropCreatedDatabase, async () => {
            await con.useDatabase('_system');
            await con.dropDatabase(databaseName)
        });
    });
}

