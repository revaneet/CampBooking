import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.interface';

@Component({
    selector : 'app-camp-invoice',
    templateUrl : './camp-invoice.component.html',
    styleUrls : ['./camp-invoice.component.css']
})
export class CampInvoiceComponent implements OnInit{
    bookingId: string;
    booking: Booking;
    totalNights: number;
    totalAmount: number;
    stars: number[] = [1, 2, 3, 4, 5];
    selectedStarValue: number;
    
    constructor(
        private route: ActivatedRoute,
        private bookingService: BookingService,
        private router:Router
    ){}

    async ngOnInit(){
        this.bookingId = this.route.snapshot.paramMap.get('bookingId');
        (await this.bookingService.getBookingById(this.bookingId))
            .subscribe( (booking: Booking) =>{
                this.booking = booking;
                this.getNumberofNights();
                this.totalAmount = this.totalNights * this.booking.Camp.RatePerNight;
                this.selectedStarValue = this.booking.Ratings;
        }) 
        
        console.log(this.booking);      
    }
    checkDates()
    {
        const d = new Date();
        if(new Date(this.booking.CheckInDate)>d && new Date(this.booking.CheckOutDate)>d)
        {
            return false;
        }
        else{
            return true;
        }
    }
    getNumberofNights()
    {
        var date1 = new Date(this.booking.CheckInDate);
        var date2 = new Date(this.booking.CheckOutDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        this.totalNights = Math.ceil(timeDiff / (1000 * 3600 * 24));    

    }
    async onCancelClick()
    {
        (await this.bookingService.deleteBookingById(this.booking.ID))
            .subscribe(()=>{
                alert("Booking cancelled successfully !");
                this.router.navigate(['/Home']);
            })
    }
    onEditClick()
    {
        this.router.navigate(['/ManageBookings/Invoice/EditBooking',this.booking.ID]);
    }
    async countStar(star) {
        this.selectedStarValue = star;
        (await this.bookingService.putRatingByBookingId(this.bookingId, star)).subscribe();
        console.log('Value of star', star);
    }
    transform(base64Image){
        
        return 'data:image/jpeg;base64,' + base64Image;
    }
    
    
}