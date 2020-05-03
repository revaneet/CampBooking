import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampService } from '../services/camp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camp } from '../models/camp.interface';

@Component({
    selector : 'app-camp-update',
    templateUrl : './camp-update.component.html',
    styleUrls : ['./camp-update.component.css']
})
export class CampUpdateComponent implements OnInit{
    camp: Camp;
    campForm: FormGroup;
    campName: FormControl;
    ratePerNight: FormControl;
    maxCapacity: FormControl;
    desc: FormControl;
    campImage: FormControl;
    imageToUpload: File;
    imageUrl: string;

    constructor(
        private campService: CampService,
        private router: Router,
        private route: ActivatedRoute
    ){}

    async ngOnInit() {
        this.campName = new FormControl('', [Validators.required] );
        this.ratePerNight = new FormControl('', [Validators.required] );
        this.maxCapacity = new FormControl('', [Validators.required] );
        this.desc = new FormControl();
        this.campImage=new FormControl();
        this.campForm = new FormGroup({
            campName : this.campName,
            ratePerNight : this.ratePerNight,
            maxCapacity : this.maxCapacity,
            desc : this.desc
        });

        const campId = this.route.snapshot.paramMap.get('id');
        (await this.campService.getCampById(campId))
            .subscribe((camp: Camp) => {
                this.camp = camp;
               this.campForm.setValue({
                    campName : this.camp.CampName,
                    ratePerNight : this.camp.RatePerNight,
                    maxCapacity : this.camp.MaxCapacity,
                    desc : this.camp.Description
                   
               })
        });
    }

    async onFormSubmit()
    {
        

    }
    onImageUpload(image: FileList)
    {
        this.imageToUpload = image.item(0);

        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
            };
        reader.readAsDataURL(this.imageToUpload);

    }
    transform(base64Image){
        return 'data:image/jpeg;base64,' + base64Image;
    }
}