import {
    benchmark,
    measure,
    
    BenchmarkData,
    Account,
    Address,
} from './utils';
import {
    OrientDBClient
} from 'orientjs';

import * as $ from './compareableMeasurements';

export default async function(data: BenchmarkData) {
    await benchmark('OrientDB', async () => {
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