import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubredditRequest } from '../../model/subreddit-model';
import { SubredditService } from '../../service/subreddit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-subreddit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-subreddit.component.html',
  styleUrl: './create-subreddit.component.css'
})
export class CreateSubredditComponent {
  subredditForm: FormGroup;
  subredditRequest: SubredditRequest = {
    name: '',
    description: ''
  }

  constructor (private subredditService:SubredditService, private router:Router) {
    this.subredditForm = new FormGroup({
      'name': new FormControl(''),
      'description': new FormControl('')
    })
  }

  onCreate() {
    this.subredditRequest.name = this.subredditForm.get('name')!.value;
    this.subredditRequest.description = this.subredditForm.get('description')!.value;

    this.subredditService.createSubreddit(this.subredditRequest).subscribe((res) => {
      this.router.navigateByUrl("/list-subreddit")
    });
  }

  onDiscard() {
    this.router.navigateByUrl("/");
  }

}
