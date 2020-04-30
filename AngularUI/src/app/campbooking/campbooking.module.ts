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
import { BookingService } from './services/booking.service';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        CampBookingComponent,
        HomeComponent,
        CampsComponent,
        CampNewComponent,
        UserComponent

    ],
    imports : [
        CampBookingRoutingModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule

    ],
    providers: [
        CampService,
        BookingService

    ],
    exports : [
        CampBookingComponent

    ]
})
export class CampBookingModule{

}
