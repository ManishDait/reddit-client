import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  title: string = "Home";
  description: string = "Welcome to Springboot Angular Reddit Home page, Check and create your favorite subreddits.";

  constructor(private router:Router, private activeRoute:ActivatedRoute) {
    this.activeRoute.queryParams.subscribe((params) => {
      if(params['subreddit'] != null || params['subreddit'] != undefined) {
        this.title = `r\\${params['subreddit']}`;
        const nav = this.router.getCurrentNavigation();
        if (nav && nav.extras && nav.extras.state) {
          const state = nav.extras.state;
          this.description = state['description'];
        }
      }
    })

    
  }

  createSubreddit() {
    this.router.navigateByUrl("/create-subreddit")
  }

  createPost() {
    this.router.navigateByUrl("/create-post")
  }

}
