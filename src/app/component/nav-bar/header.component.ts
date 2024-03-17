import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GravatarModule } from 'ngx-gravatar';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, GravatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  username!: string;

  isLoggin: boolean = false;

  constructor(private authService:AuthService, private route:Router) {
    this.isLoggin = authService.isLoggin();
    if (this.isLoggin) {
      this.username = authService.getUsername();
    }
  }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data) => this.isLoggin = data);
    this.authService.username.subscribe((data) => this.username = data);
  }

  logout() {
    this.authService.logout();
    this.isLoggin = false;
    this.route.navigateByUrl('/');
  }

}
