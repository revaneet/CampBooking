import { Component, OnInit } from '@angular/core';
import { Camp } from '../models/camp.interface';
import { CampService } from '../services/camp.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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

    constructor(
        private campService: CampService,
        private router: Router

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
}
