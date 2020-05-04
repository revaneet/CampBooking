import { Component } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
    selector : 'app-bookings-manage',
    templateUrl : './bookings-manage.component.html',
    styleUrls : ['./bookings-manage.component.css']
})
export class BookingsManageComponent{
    constructor(
        private router: Router
    ){}
    onManageClick(bookingId)
    {
        if(bookingId===null || bookingId.length<8)
        {
            alert("Enter valid invoice number");
            this.router.navigate(['/ManageBookings']);
        }
        else{
            this.router.navigate(['/ManageBookings/Invoice',bookingId]);
        }

    }

}
