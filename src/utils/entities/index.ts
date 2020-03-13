export interface Account {
    mail: string;
    password: string;
    token: string;
    createdAt: Date;
}

export interface Profile {
    account: Account;
    firstname?: string;
    lastname?: string;
    birthdate?: Date;
    gender?: 'male' | 'female';
    address?: Address;
}

export interface Address {
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
}

export interface Relationship {
    personA: Profile;
    personB: Profile;
    type: 'friends' | 'couple' | 'related';
    since: Date;
}

export interface BenchmarkData {
    accounts: Account[];
    profiles: Profile[];
    addresses: Address[];
    relationships: Relationship[];
}