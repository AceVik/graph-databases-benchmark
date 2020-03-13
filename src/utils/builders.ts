
import {
    Address
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

export function generateAddresses(amount: number): Address[] {
    const addresses: Address[] = [];

    for (let i = 0; i < amount; i++) {
        addresses.push({
            street: rnd(0, 10) !== 0 ? undefined : rndStr(6, 16) + ' ' + rnd(1, 300) + rndStr(0, 1),
            zip: rnd(0, 10) === 0 ? undefined : rnd(10000, 99999) + rndStr(0, 1),
            city: rnd(0, 10) === 0 ? undefined : rndStr(3, 8),
            country: rnd(0, 10) === 0 ? undefined : rndStr(6, 12)
        });
    }

    return addresses;
}