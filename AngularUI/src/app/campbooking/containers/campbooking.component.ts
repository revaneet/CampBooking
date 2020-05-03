import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.interface';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector : 'app-campbooking',
    templateUrl : './campbooking.component.html',
    styleUrls : ['./campbooking.component.css']
})
export class CampBookingComponent implements OnInit{
    userToken:boolean;
    userClaims: User;
    IsAdmin:false;

    navigationSubscription;
    constructor(
        private router: Router
    )
    {
        this.navigationSubscription = this.router.events
            .subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.userToken = localStorage.getItem('userToken') !== null;
            }
            
        });

    }
    
    async ngOnInit(){
        this.userToken = localStorage.getItem('userToken') !== null;
        
    }
    
    onLogOut()
    {

        localStorage.removeItem('userToken');
    }

}
