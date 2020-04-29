import { NgModule } from '@angular/core';
import { CampBookingComponent } from './containers/campbooking.component';
import {HomeComponent} from './home/home.component';
import { CampsComponent } from './camps/camps.component';
import { CampBookingRoutingModule } from './campbooking-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CampService } from './services/camp.service';
import { CampNewComponent } from './camp-new/camp-new.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CampBookingComponent,
        HomeComponent,
        CampsComponent,
        CampNewComponent

    ],
    imports : [
        CampBookingRoutingModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule

    ],
    providers: [
        CampService

    ],
    exports : [
        CampBookingComponent

    ]
})
export class CampBookingModule{

}
