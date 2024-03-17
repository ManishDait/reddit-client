import { Component } from '@angular/core';
import { SubredditService } from '../../service/subreddit.service';
import { SubredditResponse } from '../../model/subreddit-model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-subreddit',
  standalone: true,
  imports: [],
  templateUrl: './list-subreddit.component.html',
  styleUrl: './list-subreddit.component.css'
})
export class ListSubredditComponent {

  subreddits: SubredditResponse[] = [];

  constructor(private subredditSevice: SubredditService, private router:Router) {
    this.subredditSevice.getAllSubreddit().subscribe((res) => {
      this.subreddits = res;
    })
  }

  navigateToSubreddit(subreddit: SubredditResponse) {
    this.router.navigate(['/home'], {queryParams: {subreddit: subreddit.name, id: subreddit.id}, state: {description: subreddit.description}});
  }

}
