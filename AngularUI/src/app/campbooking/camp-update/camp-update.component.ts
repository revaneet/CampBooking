import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampService } from '../services/camp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camp } from '../models/camp.interface';
import { stringify } from 'querystring';

@Component({
    selector : 'app-camp-update',
    templateUrl : './camp-update.component.html',
    styleUrls : ['./camp-update.component.css']
})
export class CampUpdateComponent implements OnInit{
    camp: Camp;
    updateCamp: Camp;
    campForm: FormGroup;
    campName: FormControl;
    ratePerNight: FormControl;
    maxCapacity: FormControl;
    desc: FormControl;
    extraWeekendCharges:FormControl;
    campImage: FormControl;
    imageToUpload: File = null;
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
        this.extraWeekendCharges=new FormControl();
        this.campImage=new FormControl('',[Validators.required] );
        this.campForm = new FormGroup({
            campName : this.campName,
            ratePerNight : this.ratePerNight,
            maxCapacity : this.maxCapacity,
            desc : this.desc,
            extraWeekendCharges: this.extraWeekendCharges

        });

        const campId = this.route.snapshot.paramMap.get('id');
        (await this.campService.getCampById(campId))
            .subscribe((camp: Camp) => {
                this.camp = camp;
               this.campForm.setValue({
                    campName : this.camp.CampName,
                    ratePerNight : this.camp.RatePerNight,
                    maxCapacity : this.camp.MaxCapacity,
                    desc : this.camp.Description,
                    extraWeekendCharges: this.camp.ExtraWeekendCharges
               })
        });
    }

    async onFormSubmit()
    {
        this.updateCamp ={
            CampName : this.campForm.get("campName").value,
            RatePerNight : this.campForm.get("ratePerNight").value,
            MaxCapacity: this.campForm.get("maxCapacity").value,
            Description: this.campForm.get("desc").value,
            Image : this.imageToUpload===null? this.camp.Image : this.imageToUpload.name,
            ImageFile: this.camp.ImageFile,
            ExtraWeekendCharges:this.campForm.get("extraWeekendCharges").value
        };
        (await this.campService.putCampById(this.camp.ID,this.updateCamp))
        .subscribe(()=>{
            alert("Camp Updated Successfully !");
            this.router.navigate(["/Camps"]);
        });
        console.log(this.updateCamp);
    }
    async onDeleteClick()
    {
        (await this.campService.deleteCampById(this.camp.ID))
        .subscribe(() =>{
            alert("Camp deleted successfully");
            this.router.navigate(['/Camps']);
        });
    }
    onImageUpload(image: FileList)
    {
        this.imageToUpload = image.item(0);

        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
            this.camp.ImageFile = reader.result.toString().split(',')[1];
            
        };
        reader.readAsDataURL(this.imageToUpload);
        //this.camp.ImageFile = this.imageUrl;

    }
    transform(base64Image){
        return 'data:image/jpeg;base64,' + base64Image;
    }
    getControlValidationClasses(control: FormControl) {
        return {
          'is-invalid': control.touched && control.invalid,
          'is-valid': control.touched && control.valid
        };
      }
}