export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isVerified: boolean;
    status: 'INTERESTED' | 'ACTIVE' | 'INACTIVE';
    phoneNumber: string;
    address: string;
    postalCode: string;
    city: string;
    createdAt: Date;
    updatedAt: Date;
}
