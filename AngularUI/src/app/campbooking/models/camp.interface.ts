export interface Camp {
    ID: number ;
    CampName: string;
    RatePerNight: number ;
    MaxCapacity: number ;
    Description: string ;
    Image: string;
    ImageFile: Uint32List[];
}
