import { Component } from '@angular/core';
import { PostComponent } from './post/post.component';
import { SidebarComponent } from './side-bar/sidebar.component';
import { SubredditViewComponent } from './subreddit-view/subreddit-view.component';
import { PostService } from '../../service/post.service';
import { PostResponse } from '../../model/post-model';
import { SubredditResponse } from '../../model/subreddit-model';
import { SubredditService } from '../../service/subreddit.service';
import { forkJoin } from 'rxjs';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostComponent, 
    SidebarComponent, 
    SubredditViewComponent,
    RouterOutlet, 
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  posts: PostResponse[] = [];
  subreddits: SubredditResponse[] = [];

  constructor (private postService:PostService, private subredditService:SubredditService, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['id'] != null && params['id'] != undefined) {
        postService.getPostBySubreddit(params['id']).subscribe((res) => {
          this.posts = res;
          subredditService.getAllSubreddit().subscribe((res) => {
            this.subreddits = res;
          });
        });
      } else {
        postService.getAllPost().subscribe((res) => {
          this.posts = res;
          subredditService.getAllSubreddit().subscribe((res) => {
            this.subreddits = res;
          });
        });
      }
    })
  }

}
