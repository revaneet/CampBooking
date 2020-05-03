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

    camp: Camp;
    bookingForm: FormGroup;
    billingAddress: FormControl;
    state: FormControl;
    country: FormControl;
    zipCode: FormControl;
    phoneNumber: FormControl;
    booking: Booking;
    nightStayNumber : number;
    bookingId: string;

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
    DaysBetween(StartDate, EndDate) {
        const oneDay = 1000 * 60 * 60 * 24;

        const start = new Date().setUTCDate(StartDate);
        const end = new Date().setUTCDate(EndDate);
      
     
        return (start - end) / oneDay;
      }

    async ngOnInit() {
        const campId = this.route.snapshot.paramMap.get('id');
        (await this.campService.getCampById(campId))
            .subscribe((camp: Camp) => {
                this.camp = camp;
        });
        this.campFilter = this.data.campFilter;
        this.nightStayNumber = this.DaysBetween(this.campFilter.CheckInDate, this.campFilter.CheckOutDate);
    }

    async onFormSubmit()
    {
        this.booking = {
            BillingAddress : this.bookingForm.get('billingAddress').value,
            Country : this.bookingForm.get('country').value,
            State: this.bookingForm.get('state').value,
            CheckInDate: this.campFilter.CheckInDate,
            CheckOutDate: this.campFilter.CheckOutDate,
            PhoneNumber: this.bookingForm.get('phoneNumber').value,
            ZipCode: this.bookingForm.get('zipCode').value,
            CampID: this.camp.ID
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
}
