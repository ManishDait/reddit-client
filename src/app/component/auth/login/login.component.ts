import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from '../../../model/login-model';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: LoginRequest;
  loginForm: FormGroup;

  registerMessage!: string;
  isError!: boolean;

  constructor (private authService:AuthService, private activeRoute:ActivatedRoute, private router:Router, private toastr:ToastrService) {
    this.loginForm = new FormGroup ({
      'username': new FormControl(''),
      'password': new FormControl('')
    });

    this.loginRequest = {
      username: '',
      password: ''
    }

    this.activeRoute.queryParams.subscribe(params => {
      if(params['registered'] !== undefined && params['registered']  === 'true') {
        this.toastr.success('Signup Sucessfull');
        this.registerMessage = 'Please Activate the account before login, Check your inbox for activation link';
      }
    })
  }

  onLogin() {
    this.loginRequest.username = this.loginForm.get('username')!.value;
    this.loginRequest.password = this.loginForm.get('password')!.value;

    this.authService.login(this.loginRequest).subscribe(data => {
       if (data) {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Sucessfull');
       } else {
        this.isError = true;
        this.toastr.error('Authentication Fails');
       }
    }, (err) => {
      this.toastr.error('Authentication Invalid');
    });
  }
}
