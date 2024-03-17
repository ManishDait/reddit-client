import { Component, Input } from '@angular/core';
import { SubredditResponse } from '../../../model/subreddit-model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-subreddit-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subreddit-view.component.html',
  styleUrl: './subreddit-view.component.css'
})
export class SubredditViewComponent {
  @Input() subreddits: SubredditResponse[] = [];

  constructor (private router:Router) {}

  navigateToSubreddit(subreddit: SubredditResponse) {
    this.router.navigate(['/home'], {queryParams: {subreddit: subreddit.name, id: subreddit.id}, state: {description: subreddit.description}});
  }
}
