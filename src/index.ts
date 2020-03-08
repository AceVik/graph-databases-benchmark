import { benchmark } from './utils';

benchmark('Test benchmark', async () => {
    for(let i = 0; i < 9999999999; i++);
});