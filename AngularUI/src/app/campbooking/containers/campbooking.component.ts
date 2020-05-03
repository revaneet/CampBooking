import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.interface';

@Component({
    selector : 'app-campbooking',
    templateUrl : './campbooking.component.html',
    styleUrls : ['./campbooking.component.css']
})
export class CampBookingComponent implements OnInit{
    userToken:boolean;
    userClaims: User;
    IsAdmin:false;

    constructor(
        private userService: UserService
    ){
        this.userToken = localStorage.getItem('userToken') !== null;

    }
    async ngOnInit(){
        this.userToken = localStorage.getItem('userToken') !== null;
        
    }
    
    onLogOut()
    {
        
        localStorage.removeItem('userToken');
    }

}
