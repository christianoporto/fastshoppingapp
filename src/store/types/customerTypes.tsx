export interface ICustomer {
    id?: string;
    fullName: string;
    idNumber: string;
    address: string;
    phoneNumber: string;
    email: string;
}
export class Customer implements ICustomer {
    fullName: string = "";
    idNumber: string = "";
    address: string = "";
    phoneNumber: string = "";
    email: string = "";
}
