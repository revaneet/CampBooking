import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService{

    url = 'http://localhost:53056';

    constructor(private http: HttpClient) {}

    async userAuthentication(email, password)
    {
        console.log(email , password);
        const data = 'email=' + email + '&password=' + password + '&grant_type=password';
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-urlencoded',
            'No-Auth': 'True'
        });
        return this.http.post(this.url + '/token', data , {headers});

    }
}