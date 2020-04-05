import {
    benchmark,
    measure,
    
    BenchmarkData,
    Account,
    Address,
} from './utils';
import {
    Database,
    DocumentCollection,
    EdgeCollection,
} from 'arangojs';
import * as $ from './compareableMeasurements';

export interface ProfileEntity {
    account: string;
    firstname?: string;
    lastname?: string;
    birthdate?: Date;
    gender?: 'male' | 'female';
    address?: string;
}

interface SimpleRelation {
    _from: string;
    _to: string;
}

interface BasicResponse { 
    _id: string;
    _key: string;
    _rev: string;
};

export default async function(data: BenchmarkData) {
    return await benchmark('ArangoDB', async () => {
        const con = new Database('tcp://127.0.0.1:8529');
        await con.useBasicAuth('root', 'graphdbbenchmark');
    
        const databaseName = 'benchmarkdb';
    
        await measure($.CreateNewDatabase, async () => {
            await con.createDatabase(databaseName);
            await con.useDatabase(databaseName);
        });

        const accountsCollectionName = 'accounts';
        const addressesCollectionName = 'addresses';
        const profilesCollectionName = 'profiles';
        const relationsCollectionName = 'relations';

        let accountsCollection: DocumentCollection<Account>;
        let addressesCollection: DocumentCollection<Address>;
        let profilesCollection: DocumentCollection<ProfileEntity>;
        let relationsCollection: EdgeCollection<SimpleRelation>;

        let accountResponses: BasicResponse[] = [];
        let addressResponses: BasicResponse[] = [];
        let profileResponses: BasicResponse[] = [];

        await measure('Create data containers', async () => {
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
                
                (async () => {
                    relationsCollection = await con.edgeCollection(relationsCollectionName);
                    await relationsCollection.create();
                })(),
            ]);
        });

        await Promise.all([
            measure('Insert accounts', async () => {
                accountResponses = await Promise.all(data.accounts.map(acc => accountsCollection.save(acc)));
            }),
            
            measure('Insert addresses', async () => {
                addressResponses = await Promise.all(data.addresses.map(addr => addressesCollection.save(addr)));
            })
        ]);

        await measure('Insert profiles', async () => {
            profileResponses = await Promise.all(data.profiles.map(profile => profilesCollection.save({
                account: accountResponses[profile.accountIndex]._id,
                firstname: profile.firstname,
                lastname: profile.lastname,
                gender: profile.gender,
                birthdate: profile.birthdate,
                address: profile.addressIndex !== undefined ? addressResponses[profile.addressIndex]._id : undefined
            })));
        });

        await measure('Insert relations', async () => {
            await Promise.all(data.relations.map(relation => relationsCollection.save({
                _from: profileResponses[relation.fromIndex]._id,
                _to: profileResponses[relation.toIndex]._id
            })));
        });

        await measure($.DropCreatedDatabase, async () => {
            await con.useDatabase('_system');
            await con.dropDatabase(databaseName)
        });

        await con.close();
    });
}

