import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.interface';
import { Camp } from '../models/camp.interface';
import { CampService } from '../services/camp.service';

@Component({
    selector : 'app-camp-invoice',
    templateUrl : './camp-invoice.component.html',
    styleUrls : ['./camp-invoice.component.css']
})
export class CampInvoiceComponent implements OnInit{
    bookingId: string;
    booking: Booking;
    TotalNights: number;
    TotalAmount: number;

    constructor(
        private route: ActivatedRoute,
        private bookingService: BookingService
    ){}

    async ngOnInit(){
        this.bookingId = this.route.snapshot.paramMap.get('bookingId');
        (await this.bookingService.getBookingById(this.bookingId))
            .subscribe( (booking: Booking) =>{
                this.booking = booking;
        }) 
        console.log(this.booking);      
    }
    
}