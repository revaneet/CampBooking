import { NgModule } from '@angular/core';
import { CampBookingComponent } from './containers/campbooking.component';
import {HomeComponent} from './home/home.component';
import { CampsComponent } from './camps/camps.component';

@NgModule({
    declarations: [
        CampBookingComponent,
        HomeComponent,
        CampsComponent

    ],
    imports : [

    ],
    providers: [

    ],
    exports : [
        CampBookingComponent,
        HomeComponent,
        CampsComponent

    ]
})
export class CampBookingModule{

}
