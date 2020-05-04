import { Camp } from './camp.interface';

export interface Booking{
    ID?: string;
    CampID: number;
    CheckInDate: Date;
    CheckOutDate: Date;
    BillingAddress: string;
    State: string;
    Country: string;
    ZipCode: string;
    PhoneNumber: string;
    Camp?: Camp;
    Ratings?:number;
}