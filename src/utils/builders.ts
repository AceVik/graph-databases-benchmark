
import {
    Address,
    Account,
    Profile,
    Relation
} from './entities';


export function rnd(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function rndStr(minLength: number, maxLength: number): string {
    const chars = [];

    while (chars.length < rnd(minLength, maxLength)) {
      const val = Math.floor(Math.random() * 100) + 23;

      if (
        (val >= 48 && val <= 57) || // 0-9
        (val >= 65 && val <= 90) || // A-Z
        (val >= 97 && val <= 122) // a-z
      ) {
        chars.push(String.fromCharCode(val));
      }
    }

    return chars.join('');
}

export function rndDate(startDate: Date, endDate: Date): Date {
  return new Date(rnd(startDate.getTime() * 0.001, endDate.getTime() * 0.001) * 1000);
}

export function generateAddresses(amount: number): Address[] {
    const addresses: Address[] = [];

    for (let i = 0; i < amount; i++) {
        addresses.push({
            street: rnd(0, 10) === 0 ? undefined : rndStr(6, 16) + ' ' + rnd(1, 300) + rndStr(0, 1),
            zip: rnd(0, 10) === 0 ? undefined : rnd(10000, 99999) + rndStr(0, 1),
            city: rnd(0, 10) === 0 ? undefined : rndStr(3, 8),
            country: rnd(0, 10) === 0 ? undefined : rndStr(6, 12)
        });
    }

    return addresses;
}

export function generateAccounts(amount: number): Account[] {
  const accounts: Account[] = [];
  const [ startDate, endDate ] = [ new Date('1992-01-01'), new Date() ];

  for (let i = 0; i < amount; i++) {
    accounts.push({
      mail: rndStr(3, 24) + (rnd(0, 8) === 0 ? rndStr(3, 24) : '') + '@' + rndStr(2, 8) + '.' + rndStr(1, 3),
      password: rndStr(64, 64),
      token: rnd(0, 3) !== 0 ? undefined : rndStr(128, 128),
      createdAt: rndDate(startDate, endDate)
    });
  }

  return accounts;
}

export function generateProfiles(accountsAmount: number, addressesAmount: number): Profile[] {
  const profiles: Profile[] = [];

  const getRndAddrIdx = (): number => rnd(0, addressesAmount - 1);

  let addrIdx = getRndAddrIdx();

  const [ startDate, endDate ] = [ new Date('1992-01-01'), new Date('2020-01-01') ];

  for (let accIdx = 0; accIdx < accountsAmount; accIdx++) {
    if (rnd(0, 8) !== 0) {
      addrIdx = getRndAddrIdx();
    }

    profiles.push({
      accountIndex: accIdx,
      birthdate: rnd(0, 10) === 0 ? undefined : rndDate(startDate, endDate),
      firstname: rnd(0, 10) === 0 ? undefined : rndStr(4, 12),
      lastname: rnd(0, 10) === 0 ? undefined : rndStr(4, 12),
      gender: rnd(0, 10) === 0 ? undefined : rnd(0, 1) === 0 ? 'male' : 'female',
      addressIndex: rnd(0, 10) === 0 ? undefined : addrIdx
    });
  }

  return profiles;
}

export function generateRelations(amount: number, profilesAmount: number): Relation[] {
  const relations: Relation[] = [];
  const getRndProfileIdx = (): number => rnd(0, profilesAmount - 1);

  for (let i = 0; i < amount; i++) {
    const fromIndex = getRndProfileIdx();
    const toIndex = (() => {
      do {
        const idx = getRndProfileIdx();
        if (idx !== fromIndex) {
          return idx;
        }
      } while (true);
    })();

    relations.push({ fromIndex, toIndex });
  }

  return relations;

}