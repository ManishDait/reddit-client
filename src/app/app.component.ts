import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/nav-bar/header.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { LoginComponent } from './component/auth/login/login.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent, 
    SignupComponent, 
    LoginComponent,
    RouterOutlet,  
    RouterLink,
    EditorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reddit-client';
}
