export interface User
{
    ID: number;
    Email: string;
    Password ?:string;
    FullName: string;
    IsAdmin: false;
}