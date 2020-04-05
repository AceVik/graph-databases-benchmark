import {
    benchmark,
    measure,
    
    BenchmarkData
} from './utils';
import {
    OrientDBClient,
    ORID,
} from 'orientjs';

import * as $ from './compareableMeasurements';

function toIdString(rid: ORID): string {
    return '#' + rid.cluster + ':' + rid.position;
}

export default async function(data: BenchmarkData) {
    return await benchmark('OrientDB', async () => {
        const con = await OrientDBClient.connect({ host: "localhost" });

        const databaseName = 'benchmarkdb';
        const authData = {
            username: 'root',
            password: 'graphdbbenchmark'
        };

        await measure($.CreateNewDatabase, async () => {
            await con.createDatabase({
                name: databaseName,
                ...authData
            });
        });

        const sess = await con.session({
            name: databaseName,
            ...authData
        });

        const accountsClassName = 'Account';
        const addressesClassName = 'Address';
        const profilesClassName = 'Profile';
        const relationsClassName = 'Relation';

        let accountResponses: any[] = [];
        let addressResponses: any[] = [];
        let profileResponses: any[] = [];

        await measure('Create data containers', async () => {
            await Promise.all([
                (async () => {
                    await sess.exec(`CREATE CLASS ${accountsClassName} EXTENDS V`);
                    await sess.exec(`CREATE PROPERTY ${accountsClassName}.mail STRING (MANDATORY TRUE, NOTNULL TRUE)`);
                    await sess.exec(`CREATE PROPERTY ${accountsClassName}.password STRING (MANDATORY TRUE, NOTNULL TRUE)`);
                    await sess.exec(`CREATE PROPERTY ${accountsClassName}.token STRING`);
                    await sess.exec(`CREATE PROPERTY ${accountsClassName}.createdAt DATETIME (NOTNULL TRUE)`);
                })(),

                (async () => {
                    await sess.exec(`CREATE CLASS ${addressesClassName} EXTENDS V`);
                    await sess.exec(`CREATE PROPERTY ${addressesClassName}.street STRING`);
                    await sess.exec(`CREATE PROPERTY ${addressesClassName}.zip STRING`);
                    await sess.exec(`CREATE PROPERTY ${addressesClassName}.city STRING`);
                    await sess.exec(`CREATE PROPERTY ${addressesClassName}.country STRING`);
                })(),

                (async () => {
                    await sess.exec(`CREATE CLASS ${profilesClassName} EXTENDS V`);
                    await sess.exec(`CREATE PROPERTY ${profilesClassName}.account LINK ${accountsClassName} (MANDATORY TRUE, NOTNULL TRUE)`);
                    await sess.exec(`CREATE PROPERTY ${profilesClassName}.firstname STRING`);
                    await sess.exec(`CREATE PROPERTY ${profilesClassName}.lastname STRING`);
                    await sess.exec(`CREATE PROPERTY ${profilesClassName}.birthdate DATETIME`);
                    await sess.exec(`CREATE PROPERTY ${profilesClassName}.gender STRING`);
                    await sess.exec(`CREATE PROPERTY ${profilesClassName}.address LINK ${addressesClassName}`);
                })(),

                (async () => {
                    await sess.exec(`CREATE CLASS ${relationsClassName} EXTENDS E`);
                    await sess.exec(`CREATE PROPERTY ${relationsClassName}.in LINK ${profilesClassName} (MANDATORY TRUE, NOTNULL TRUE)`);
                    await sess.exec(`CREATE PROPERTY ${relationsClassName}.out LINK ${profilesClassName} (MANDATORY TRUE, NOTNULL TRUE)`);
                })(),
            ]);
        });

        await Promise.all([
            measure('Insert accounts', async () => {
                accountResponses = await Promise.all(data.accounts.map(acc => sess.insert().into(accountsClassName).set(acc).exec()));
            }),
            
            measure('Insert addresses', async () => {
                addressResponses = await Promise.all(data.addresses.map(addr => sess.insert().into(addressesClassName).set(addr).exec()));
            })
        ]);
        
        await measure('Insert profiles', async () => {
            profileResponses = await Promise.all(data.profiles.map(profile => {
                const addr = profile.addressIndex !== undefined ? { address: toIdString(addressResponses[profile.addressIndex][0]['@rid']) } : {};
                return sess.insert().into(profilesClassName).set({
                    account: toIdString(accountResponses[profile.accountIndex][0]['@rid']),
                    ...addr,
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    birthdate: profile.birthdate,
                    gender: profile.gender
                }).exec();
            }));
        });
        
        await measure('Insert relations', async () => {
            await Promise.all(data.relations.map(relation => sess.exec(`CREATE EDGE ${relationsClassName} FROM ${toIdString(profileResponses[relation.fromIndex][0]['@rid'])} TO ${toIdString(profileResponses[relation.toIndex][0]['@rid'])}`)));
        });

        await measure($.DropCreatedDatabase, async () => {
            await con.dropDatabase({
                ...authData,
                // @ts-ignore
                name: databaseName // INFO: Here is a bug in orientjs types definition
            });
        });

        await sess.close();
        await con.close();
    });
}