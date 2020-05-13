import { Component, OnInit, Input } from '@angular/core';
import { CampService } from '../services/camp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camp } from '../models/camp.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { Booking } from '../models/booking.interface';
import { CampFilter } from '../models/campFilter.interface';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-camp-book',
    templateUrl : './camp-book.component.html',
    styleUrls : ['./camp-book.component.css']
})
export class CampBookComponent implements OnInit{
    campFilter: CampFilter;
    booking: Booking;    
    bookingId: string;
    camp: Camp;
    totalAmount:number;
    totalNights:number;
    totalWeekends=0;

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
        const campId = this.route.snapshot.paramMap.get('id');
        (await this.campService.getCampById(campId))
            .subscribe((camp: Camp) => {
                this.camp = camp;
                this.campFilter = this.data.campFilter;
                this.getNumberofNights();
                this.totalAmount = this.totalNights * this.camp.RatePerNight;
                this.getTotalWeekends(this.campFilter.CheckInDate,this.campFilter.CheckOutDate);
                console.log(this.totalWeekends);
        });
        
        
    }
    async onFormSubmit()
    {
        const extraChargesApplied = this.totalWeekends>0 && this.camp.ExtraWeekendCharges>0;
        this.booking = {
            BillingAddress : this.bookingForm.get('billingAddress').value,
            Country : this.bookingForm.get('country').value,
            State: this.bookingForm.get('state').value,
            CheckInDate: this.campFilter.CheckInDate,
            CheckOutDate: this.campFilter.CheckOutDate,
            PhoneNumber: this.bookingForm.get('phoneNumber').value,
            ZipCode: this.bookingForm.get('zipCode').value,
            CampID: this.camp.ID,
            ExtraChargesApplied:extraChargesApplied
        };
        console.log(this.booking);
        (await this.bookingService.postBooking(this.booking))
            .subscribe((bookingId: string) => {
                this.bookingId = bookingId;
                alert("Booking Confirmed !");
                this.router.navigate(['Camps/Invoice',bookingId]);
            });
    }
    transform(base64Image){
        return 'data:image/jpeg;base64,' + base64Image;
    }
    getNumberofNights()
    {
        var date1 = new Date(this.campFilter.CheckInDate);
        var date2 = new Date(this.campFilter.CheckOutDate);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        this.totalNights = Math.ceil(timeDiff / (1000 * 3600 * 24));    

    }
    getControlValidationClasses(control: FormControl) {
        return {
          'is-invalid': control.touched && control.invalid,
          'is-valid': control.touched && control.valid
        };
    }
    getTotalWeekends(date1, date2) {
        var d1 = new Date(date1),
            d2 = new Date(date2), 
            isWeekend = false;
    
        while (d1 < d2) {
            var day = d1.getDay();
            isWeekend = (day === 6) || (day === 0) || (day==5); 
            if (isWeekend) 
            { 
                this.totalWeekends++;
            } // return immediately if weekend found
            d1.setDate(d1.getDate() + 1);
        }
    }
}
