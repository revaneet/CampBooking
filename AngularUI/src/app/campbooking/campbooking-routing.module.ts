import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CampsComponent } from './camps/camps.component';
import { CampNewComponent } from './camp-new/camp-new.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Camp', component: CampsComponent },
  {path: 'Camp/New' , component: CampNewComponent},
  { path: '', redirectTo: '/Home', pathMatch: 'full' }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CampBookingRoutingModule {

}
