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
import { LogInComponent } from './user/login/login.component';
import { SignUpComponent } from './user/signup/signup.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { DataService } from './services/data.service';
import {CampInvoiceComponent } from './camp-invoice/camp-invoice.component';
import { CampBookComponent } from './camp-book/camp-book.component';
import { BookingsManageComponent } from './bookings-manage/bookings-manage.component';
import { CampsManageComponent } from './camps-manage/camps-manage.component';
import { CampUpdateComponent } from './camp-update/camp-update.component';

@NgModule({
    declarations: [
        CampBookingComponent,
        HomeComponent,
        CampsComponent,
        CampNewComponent,
        UserComponent,
        LogInComponent,
        SignUpComponent,
        CampBookComponent,
        CampInvoiceComponent,
        BookingsManageComponent,
        CampsManageComponent,
        CampUpdateComponent
       

    ],
    imports : [
        CampBookingRoutingModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule

    ],
    providers: [
        CampService,
        BookingService,
        UserService,
        AuthGuard,
        DataService

    ],
    exports : [
        CampBookingComponent

    ]
})
export class CampBookingModule{

}
