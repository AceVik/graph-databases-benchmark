export interface Account {
    mail: string;
    password: string;
    token?: string;
    createdAt: Date;
}

export interface Profile {
    accountIndex: number;
    firstname?: string;
    lastname?: string;
    birthdate?: Date;
    gender?: 'male' | 'female';
    addressIndex?: number;
}

export interface ProfileCollection {
    account: string;
    firstname?: string;
    lastname?: string;
    birthdate?: Date;
    gender?: 'male' | 'female';
    address?: string;
}

export interface Address {
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
}

export interface BenchmarkData {
    accounts: Account[];
    addresses: Address[];
    profiles: Profile[];
}

export function serializeBenchmarkData(data: BenchmarkData, path: string) {
    // TODO to be implemented
}

export function deserializeBenchmarkData(path: string): BenchmarkData {
    // TODO to be implemented
    return { accounts: [], addresses: [], profiles: [] };
}