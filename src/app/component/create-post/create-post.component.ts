import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostRequest } from '../../model/post-model';
import { SubredditResponse } from '../../model/subreddit-model';
import { SubredditService } from '../../service/subreddit.service';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [EditorModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  postRequest: PostRequest = {
    subredditName: '',
    postName: '',
    url: '',
    description: ''
  }

  API_KEY: string = environment.TINYMCE_API_KEY;

  subreddits: SubredditResponse[] = [];

  constructor (private subredditService:SubredditService, private postService:PostService, private router:Router) {
    this.postForm = new FormGroup({
      postName: new FormControl(''),
      subredditName: new FormControl(''),
      url: new FormControl(''),
      description: new FormControl('')
    });

    this.subredditService.getAllSubreddit().subscribe((res) => {
      this.subreddits = res;
    });
  }

  onPost() {
    this.postRequest.postName = this.postForm.get('postName')!.value;
    this.postRequest.description = this.postForm.get('description')!.value;
    this.postRequest.subredditName = this.postForm.get('subredditName')!.value;
    this.postRequest.url = this.postForm.get('url')!.value;
    this.postService.createPost(this.postRequest).subscribe((res) => {
      this.router.navigateByUrl("/");
    });
  }

  onDiscard() {
    this.router.navigateByUrl("/");
  }
}
