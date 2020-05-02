import { Component } from '@angular/core';

@Component({
    selector : 'app-campbooking',
    templateUrl : './campbooking.component.html',
    styleUrls : ['./campbooking.component.css']
})
export class CampBookingComponent{
    userToken = localStorage.getItem('userToken') !== null;

    onLogOut()
    {
        localStorage.removeItem('userToken');
    }

}
