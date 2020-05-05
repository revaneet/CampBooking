import { Component, OnInit } from '@angular/core';
import { CampService } from '../services/camp.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Camp } from '../models/camp.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector : 'app-camps-manage',
    templateUrl : './camps-manage.component.html',
    styleUrls : ['./camps-manage.component.css']
})
export class CampsManageComponent implements OnInit{
    camps: Camp[];
    constructor(
        private campService: CampService,
        private router: Router,
        private data: DataService,
        private sanitizer:DomSanitizer

    ){
        this.getAllCamps();
    }

    ngOnInit(): void {
        this.getAllCamps();
    }
    async getAllCamps()
    {
        (await this.campService.getAllCamps())
            .subscribe((camps: Camp[]) => {
                this.camps = camps;
        });
        console.log(this.camps);
    }
    onUpdateClick(camp:Camp)
    {
        this.router.navigate(['ManageCamps/UpdateCamp',camp.ID]);
    }
    transform(base64Image){
        return 'data:image/jpeg;base64,' + base64Image;
    }
    
}