import { Component, OnInit, ViewChild } from '@angular/core';
import { Camp } from '../models/camp.interface';
import { CampService } from '../services/camp.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CampFilter } from '../models/campFilter.interface';
import { DataService } from '../services/data.service';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector : 'app-camps',
    templateUrl : './camps.component.html',
    styleUrls : ['./camps.component.css']
})
export class CampsComponent implements OnInit{
    camps: Camp[];
    currentCampsToShow:Camp[];
    filterCampsForm: FormGroup;
    checkInControl: FormControl;
    checkOutControl: FormControl;
    capacityControl: FormControl;
    campFilter: CampFilter; 
    totalCamps:number; 
    stars: number[] = [1, 2, 3, 4, 5];
    selectedStarValue: number;
    constructor(
        private campService: CampService,
        private router: Router,
        private data: DataService,
        private datePipe: DatePipe
    ){
        this.getAllCamps();
    }

    async ngOnInit(){
        this.checkInControl = new FormControl();
        this.checkOutControl = new FormControl();
        this.capacityControl = new FormControl();
        this.filterCampsForm = new FormGroup({
            checkIn: this.checkInControl,
            checkOut: this.checkOutControl,
            capacity: this.capacityControl
        });
        this.getAllCamps();
        this.filterCampsForm.setValue({
            checkOut:this.getTomorrow(),
            checkIn:this.getToday(),
            capacity:0
        });
        
    }
    async filterCamps()
    {
        const{checkIn, checkOut, capacity} = this.filterCampsForm.value;
        console.log(checkIn);
        (await this.campService.getAllFilteredCamps(checkIn, checkOut, capacity))
                   .subscribe((camps: Camp[]) => {
                       this.camps = camps;
                       this.currentCampsToShow=camps;
        });
    }
    async getAllCamps()
    {
        (await this.campService.getAllCamps())
            .subscribe((camps: Camp[]) => {
                this.camps = camps;
                this.currentCampsToShow=camps.slice(0,4);
                this.totalCamps = this.camps.length;
        });
    }
    onBooking(camp: Camp)
    {
        this.campFilter = {
            CheckInDate: this.filterCampsForm.get('checkIn').value,
            CheckOutDate: this.filterCampsForm.get('checkOut').value,
            Capacity: this.filterCampsForm.get('capacity').value

        };
        this.data.set(this.campFilter);
        this.router.navigate(['Camps', camp.ID]);
    }
    transform(base64Image){
        return 'data:image/jpeg;base64,' + base64Image;
    }
    getToday()
    {
        const d = new Date();
        return this.datePipe.transform(d,'yyyy-MM-dd');
    }
    getTomorrow()
    {
        let d = new Date();
        d.setDate(d.getDate() + 1);
        d.getDate();
        return this.datePipe.transform(d, 'yyyy-MM-dd');

    }
    onPageChange($event) {
        this.currentCampsToShow =  this.camps.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
      }
}
