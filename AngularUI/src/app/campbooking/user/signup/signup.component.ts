import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector : 'app-signup',
    templateUrl : './signup.component.html',
    styleUrls : ['./signup.component.css']
})
export class SignUpComponent implements OnInit{
    
    signUpForm: FormGroup;
    userEmail: FormControl;
    fullName: FormControl;
    password: FormControl;

    ngOnInit(): void {
        this.userEmail = new FormControl();
        this.password = new FormControl();
        this.fullName = new FormControl();
        this.signUpForm = new FormGroup({
            userEmail: this.userEmail,
            fullName: this.fullName,
            password: this.password
        });
    }

    onFormSubmit()
    {

    }



}