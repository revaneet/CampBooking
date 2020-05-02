import { Component, OnInit } from '@angular/core';
import { Camp } from '../models/camp.interface';
import { CampService } from '../services/camp.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CampFilter } from '../models/campFilter.interface';
import { DataService } from '../services/data.service';

@Component({
    selector : 'app-camps',
    templateUrl : './camps.component.html',
    styleUrls : ['./camps.component.css']
})
export class CampsComponent implements OnInit{
    camps: Camp[];
    filterCampsForm: FormGroup;
    checkInControl: FormControl;
    checkOutControl: FormControl;
    capacityControl: FormControl;
    campFilter: CampFilter;   

    constructor(
        private campService: CampService,
        private router: Router,
        private data: DataService

    ){
        this.getAllCamps();
    }

    ngOnInit(): void {
        this.checkInControl = new FormControl();
        this.checkOutControl = new FormControl();
        this.capacityControl = new FormControl();
        this.filterCampsForm = new FormGroup({
            checkIn: this.checkInControl,
            checkOut: this.checkOutControl,
            capacity: this.capacityControl
        });
        this.getAllCamps();

    }
    async filterCamps()
    {
        const{checkIn, checkOut, capacity} = this.filterCampsForm.value;
        (await this.campService.getAllFilteredCamps(checkIn, checkOut, capacity))
                   .subscribe((camps: Camp[]) => {
                       this.camps = camps;
        });
    }
    async getAllCamps()
    {
        (await this.campService.getAllCamps())
            .subscribe((camps: Camp[]) => {
                this.camps = camps;
        });
        console.log(this.camps);
    }
    onBooking(camp: Camp)
    {
        this.campFilter = {
            CheckInDate: this.filterCampsForm.get('checkIn').value,
            CheckOutDate: this.filterCampsForm.get('checkOut').value,
            Capacity: this.filterCampsForm.get('capacity').value

        };
        this.router.navigate(['Camps', camp.ID]);

        this.data.set(this.campFilter);
    }
}
