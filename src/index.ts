import { benchmark } from './utils';
import { ArangoDB } from './benchmark_drivers/ArangoDB';

/*benchmark('Test benchmark', async () => {
    for(let i = 0; i < 9999999999; i++);
});*/

const driver = new ArangoDB();