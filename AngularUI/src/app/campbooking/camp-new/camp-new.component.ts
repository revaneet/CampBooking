import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampService } from '../services/camp.service';
import { Router } from '@angular/router';
import { Camp } from '../models/camp.interface';

@Component({
    selector : 'app-camp-new',
    templateUrl : './camp-new.component.html',
    styleUrls : ['./camp-new.component.css']
})
export class CampNewComponent implements OnInit{
    campForm: FormGroup;
    campName: FormControl;
    ratePerNight: FormControl;
    maxCapacity: FormControl;
    desc: FormControl;
    imageToUpload: File;
    image64Base:string;
    camp:Camp;

    constructor(
        private campService: CampService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.campName = new FormControl('', [Validators.required] );
        this.ratePerNight = new FormControl('', [Validators.required] );
        this.maxCapacity = new FormControl('', [Validators.required] );
        this.desc = new FormControl();
        this.campForm = new FormGroup({
            campName : this.campName,
            ratePerNight : this.ratePerNight,
            maxCapacity : this.maxCapacity,
            desc : this.desc
        });
    }

    async onFormSubmit()
    {
        this.camp ={
            CampName : this.campForm.get("campName").value,
            RatePerNight : this.campForm.get("ratePerNight").value,
            MaxCapacity: this.campForm.get("maxCapacity").value,
            Description: this.campForm.get("desc").value,
            Image : this.imageToUpload.name,
            ImageFile: this.image64Base
        };
        
        (await this.campService.postNewCamp(this.camp))
                        .subscribe(() => {
                            this.router.navigateByUrl('/Camp');
                        });

    }
    onImageUpload(image: FileList)
    {
        this.imageToUpload = image.item(0);

        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.image64Base = reader.result.toString().split(',')[1];
            
        };
        reader.readAsDataURL(this.imageToUpload);

    }
    transform(base64Image){
        return 'data:image/jpeg;base64,' + base64Image;
    }

}
