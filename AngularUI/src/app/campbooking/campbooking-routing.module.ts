import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CampsComponent } from './camps/camps.component';
import { CampNewComponent } from './camp-new/camp-new.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/signup/signup.component';
import { LogInComponent } from './user/login/login.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Camp', component: CampsComponent },
  {path: 'Camp/New' , component: CampNewComponent},
  {
    path: 'SignUp', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'LogIn', component: UserComponent,
    children: [{ path: '', component: LogInComponent }]
  },
  
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }

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
