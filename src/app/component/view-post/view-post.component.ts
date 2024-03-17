import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { PostResponse } from '../../model/post-model';
import { VoteComponent } from '../home/vote/vote.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentRequest, CommentResponse } from '../../model/comment-model';
import { CommentService } from '../../service/comment.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [VoteComponent, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {

  post!: PostResponse;
  comments: CommentResponse[] = [];

  commentForm: FormGroup;
  commentRequest:CommentRequest = {
    text: '',
    postId: 0
  }

  constructor (private router:Router, private activeRoute:ActivatedRoute, private postService:PostService, private commentService: CommentService) {
    this.activeRoute.queryParams.subscribe((prams) => {
      if(prams['id'] != null && prams['id'] != undefined) {
        this.getComments(prams['id']);
      }
    });

    router.routeReuseStrategy.shouldReuseRoute= () => false;

    this.commentForm = new FormGroup({
      'text': new FormControl('')
    })
  }

  getComments(id: number) {
    this.postService.getPost(id).subscribe((res) => {
      this.post = res;
      this.commentService.getComment(this.post.id).subscribe((res) => {
        this.comments = res;
      })
    });
  }

  onComment() {
    this.commentRequest.postId = this.post.id;
    this.commentRequest.text = this.commentForm.get('text')!.value;

    this.commentService.createComment(this.commentRequest).subscribe((res) => {
      this.getComments(this.post.id);
    })
  }

}
