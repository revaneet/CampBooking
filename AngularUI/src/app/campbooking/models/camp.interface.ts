export interface Camp {
    ID?: number ;
    CampName: string;
    RatePerNight: number ;
    MaxCapacity: number ;
    Description: string ;
    Image: string;
    ImageFile?: string;
    Ratings?:number;
    ExtraWeekendCharges?:number;

}
