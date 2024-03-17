import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupRequest } from '../../../model/auth-model';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupRequest: SignupRequest
  signUpForm: FormGroup;

  constructor (private authService:AuthService, private router: Router, private toastr:ToastrService) {
    this.signupRequest = {
      username: '',
      password: '',
      email: ''
    };

    this.signUpForm = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),
      'email': new FormControl('')
    });
  }

  onSignUp() {
    this.signupRequest.email = this.signUpForm.get('email')!.value;
    this.signupRequest.username = this.signUpForm.get('username')!.value;
    this.signupRequest.password = this.signUpForm.get('password')!.value;

    this.authService.signUp(this.signupRequest)
      .subscribe(data => {
        this.router.navigate(['/login'], {queryParams: {registered: 'true'}})
      }, err => {
        this.toastr.error('Registration Failed! Try again')
      });
  }

}
