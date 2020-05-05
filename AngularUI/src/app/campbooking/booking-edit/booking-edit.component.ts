import { Component } from '@angular/core';
import { CampFilter } from '../models/campFilter.interface';
import { Camp } from '../models/camp.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Booking } from '../models/booking.interface';
import { BookingService } from '../services/booking.service';
import { CampService } from '../services/camp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
    selector : 'app-booking-edit',
    templateUrl : './booking-edit.component.html',
    styleUrls : ['./booking-edit.component.css']
})
export class BookingEditComponent{
    campFilter: CampFilter;
    camp: Camp;
    booking: Booking;
    updatedBooking:Booking;
    stars: number[] = [1, 2, 3, 4, 5];
    selectedStarValue: number;
    totalNights : number;
    totalAmount:number;

    bookingForm: FormGroup;
    billingAddress: FormControl;
    state: FormControl;
    country: FormControl;
    zipCode: FormControl;
    phoneNumber: FormControl;    
    

    constructor(
        private bookingService: BookingService,
        private campService: CampService,
        private route: ActivatedRoute,
        private data: DataService,
        private router: Router
    ){
        this.billingAddress = new FormControl('', [Validators.required] );
        this.state = new FormControl('', [Validators.required] );
        this.country = new FormControl('', [Validators.required] );
        this.zipCode = new FormControl('', [Validators.required] );
        this.phoneNumber = new FormControl('', [Validators.required] );

        this.bookingForm = new FormGroup({
            billingAddress : this.billingAddress,
            state : this.state,
            country : this.country,
            zipCode : this.zipCode,
            phoneNumber : this.phoneNumber
        });

        
    }
    async ngOnInit() {
        const bookingId = this.route.snapshot.paramMap.get('bookingId');
        (await this.bookingService.getBookingById(bookingId))
            .subscribe((booking: Booking) => {
                this.booking = booking;
                this.camp = this.booking.Camp;
                this.bookingForm.setValue({
                    billingAddress : this.booking.BillingAddress,
                    state : this.booking.State,
                    country : this.booking.Country,
                    zipCode : this.booking.ZipCode,
                    phoneNumber : this.booking.PhoneNumber
                });
                this.selectedStarValue=this.booking.Ratings;
                this.getNumberofNights();
                this.totalAmount = this.totalNights*this.booking.Camp.RatePerNight;
        });
    
    }

    async onFormSubmit()
    {
        this.updatedBooking = {
            BillingAddress : this.bookingForm.get('billingAddress').value,
            Country : this.bookingForm.get('country').value,
            State: this.bookingForm.get('state').value,
            CheckInDate: this.booking.CheckInDate,
            CheckOutDate: this.booking.CheckOutDate,
            PhoneNumber: this.bookingForm.get('phoneNumber').value,
            ZipCode: this.bookingForm.get('zipCode').value,
            CampID: this.camp.ID,
            Ratings:this.selectedStarValue
            
        };
        (await this.bookingService.putBookingById(this.booking.ID,this.updatedBooking))
                   .subscribe(() =>{
                       alert("Booking updated successfully !");
                   })
        
        
    }
    transform(base64Image){
        return 'data:image/jpeg;base64,' + base64Image;
    }
    countStar(star) {
        this.selectedStarValue = star;
        console.log('Value of star', star);
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
        console.log("here click");
        (await this.bookingService.deleteBookingById(this.booking.ID)).subscribe();
    }
    getControlValidationClasses(control: FormControl) {
        return {
          'is-invalid': control.touched && control.invalid,
          'is-valid': control.touched && control.valid
        };
      }


}