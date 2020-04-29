import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampService } from '../services/camp.service';
import { Router } from '@angular/router';

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
    imageUrl: string;

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
        (await this.campService.postNewCamp(this.campForm, this.imageToUpload))
                        .subscribe(() => {
                            this.router.navigateByUrl('/Camp');
                        });

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

}
