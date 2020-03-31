import {
    rnd,
    rndStr,
    rndDate,
    generateAddresses,
    generateAccounts,
    generateProfiles
} from './builders';
import isDate from 'date-fns/isDate';

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

describe('rndDate function', () => {
    it('should generate a date between 2000-02-20 and 2000-02-25', async () => {
        
        const start = new Date('2000-02-20');
        const end = new Date('2000-02-25');

        const startTS = start.getTime();
        const endTS = end.getTime();

        for (let i = 0; i < 100; i++) {
            const date = rndDate(start, end);
            const dateTS = date.getTime();

            expect(dateTS).toBeGreaterThanOrEqual(startTS);
            expect(dateTS).toBeLessThanOrEqual(endTS);
        }
    });

    it('should generate at least 90% of different results on multiple calls', async () => {

        const runs = 1000;
        const dates = {};

        const start = new Date('1992-01-01');
        const end = new Date('2020-01-01');

        for (let i = 0; i < runs; i++) {
            dates[Math.round(rndDate(start, end).getTime() * 0.001)] = true;
        }

        expect(Object.keys(dates).length).toBeGreaterThanOrEqual(Math.round(runs * 0.9));
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

describe('generateAccounts function', () => {
    it('should generate n account objects with random values', async () => {
        const accs = generateAccounts(50);
        const types = ['string', 'undefined'];
        
        let undefinedTokenExists = false;
        let definedTokenExists = false;

        for (let acc of accs) {
            expect(typeof acc).toBe('object');

            expect(typeof acc.mail).toBe('string');
            expect(acc.mail).toMatch(/^\w+(\.\w+)?@\w+\.\w+$/is);

            expect(typeof acc.password).toBe('string');

            expect(types.includes(typeof acc.token)).toBeTruthy();

            if (acc.token) {
                definedTokenExists = true;
            } else {
                undefinedTokenExists = true;
            }

            expect(isDate(acc.createdAt)).toBeTruthy();
        }

        expect(definedTokenExists).toBeTruthy();
        expect(undefinedTokenExists).toBeTruthy();
    });
});

describe('generateProfiles function', () => {
    it('should generate n profiles objects with random values', async () => {
        const accs = generateAccounts(50);
        const addrs = generateAddresses(50);

        const profiles = generateProfiles(accs.length, addrs.length);

        const types = ['string', 'undefined'];

        let [ definedAddressesExist, undefinedAddressesExist ] = [ false, false ];
        const foundAddresses: {[addressIndex: number]: number} = {};

        for (let profile of profiles) {
            expect(typeof profile).toBe('object');

            expect(profile.accountIndex).toBeGreaterThanOrEqual(0);
            expect(profile.accountIndex).toBeLessThan(accs.length);

            if (profile.addressIndex === undefined) {
                undefinedAddressesExist = true;
            } else {
                expect(profile.addressIndex).toBeGreaterThanOrEqual(0);
                expect(profile.addressIndex).toBeLessThan(accs.length);

                if (!foundAddresses[profile.addressIndex]) {
                    foundAddresses[profile.addressIndex] = 1;
                } else {
                    foundAddresses[profile.addressIndex]++;
                }

                definedAddressesExist = true;
            }

            expect(types.includes(typeof profile.firstname)).toBeTruthy();
            expect(types.includes(typeof profile.lastname)).toBeTruthy();
            expect(types.includes(typeof profile.gender)).toBeTruthy();
            
            if (profile.birthdate) {
                expect(isDate(profile.birthdate)).toBeTruthy();
            }
        }

        expect(definedAddressesExist).toBeTruthy();
        expect(undefinedAddressesExist).toBeTruthy();

        let multipleProfilesWithSameAddressExist = false;

        for (let addrIdx of Object.keys(foundAddresses)) {
            if (foundAddresses[addrIdx] > 1) {
                multipleProfilesWithSameAddressExist = true;
                break;
            }
        }

        expect(multipleProfilesWithSameAddressExist).toBeTruthy();
    });
});