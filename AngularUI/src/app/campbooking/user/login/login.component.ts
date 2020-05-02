import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    selector : 'app-login',
    templateUrl : './login.component.html',
    styleUrls : ['./login.component.css']
})
export class LogInComponent{
    logInForm: FormGroup;
    userEmail: FormControl;
    password: FormControl;
    isLoginError = false;

    constructor(
       private userService: UserService,
       private router: Router){}

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit(): void {
        this.userEmail = new FormControl();
        this.password = new FormControl();
    
        this.logInForm = new FormGroup({
            userEmail: this.userEmail,
            password: this.password
        });
    }

    async onFormSubmit()
    {
        // tslint:disable-next-line: max-line-length
        (await this.userService.userAuthentication(this.logInForm.get('userEmail').value, this.logInForm.get('password').value)).subscribe((data : any) => {
            localStorage.setItem('userToken' , data.access_token);
            this.router.navigate(['/Home']);
        },
        (err: HttpErrorResponse) => {
            this.isLoginError = true;

        });
    }

}
