import {
    rnd,
    rndStr,
    generateAddresses
} from './builders';

console.log = jest.fn();

describe('rnd function', () => {
    it('should generate a number between two numbers (including the numbers itself)', () => {

        const minValue = 1;
        const maxValue = 100;

        let minValueFound = false;
        let maxValueFound = false;

        let runs = 50000;
        let val: number;

        do {
            val = rnd(minValue, maxValue);

            minValueFound = minValueFound || val === minValue;
            maxValueFound = maxValueFound || val === maxValue;

            expect(val).toBeGreaterThanOrEqual(minValue);
            expect(val).toBeLessThanOrEqual(maxValue);

            runs--;
        } while(
            (
                (!minValueFound || !maxValueFound) &&
                runs > -50000
            )
            || runs > 0
        );


        // Info: It is possible that this two tests fail even when the function works correct (just restart test)
        expect(minValueFound).toBeTruthy();
        expect(maxValueFound).toBeTruthy();
    });
});


describe('rndStr function', () => {
    it('should generate a string with a length between 3 and 12 characters', async () => {
        for (let i = 0; i < 100; i++) {
            const str = rndStr(3, 12);

            expect(str.length).toBeGreaterThanOrEqual(3);
            expect(str.length).toBeLessThanOrEqual(12);
        }
    });

    it('should generate at least 90% of different results on multiple calls', async () => {

        const runs = 1000;
        const strings = {};

        for (let i = 0; i < runs; i++) {
            strings[rndStr(3, 12)] = true;
        }

        expect(Object.keys(strings).length).toBeGreaterThanOrEqual(Math.round(runs * 0.9));
    });
});

describe('generateAddresses function', () => {
    it('should generate n address objects with random values', async () => {
        const addrs = generateAddresses(10);
        const types = ['string', 'undefined'];
        
        for (let addr of addrs) {
            expect(typeof addr).toBe('object');
            expect(types.includes(typeof addr.street)).toBeTruthy();
            expect(types.includes(typeof addr.zip)).toBeTruthy();
            expect(types.includes(typeof addr.city)).toBeTruthy();
            expect(types.includes(typeof addr.country)).toBeTruthy();
            expect(
                Object.values(addr)
                    .filter(x => !!x)
                    .length
            ).toBeGreaterThanOrEqual(1);
        }
    });
});