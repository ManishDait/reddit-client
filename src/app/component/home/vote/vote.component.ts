import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';
import { PostResponse } from '../../../model/post-model';
import { VoteService } from '../../../service/vote.service';
import { VoteRequest } from '../../../model/vote-model';
import { PostService } from '../../../service/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.css'
})
export class VoteComponent {
  @Input() post!: PostResponse;
  faUpArrow = faArrowUp;
  faDownArrow = faArrowDown;

  voteRequest: VoteRequest = {
    postId: 0,
    voteType: "",
  }

  constructor (private voteService:VoteService, private postService:PostService) {}

  upVote() {
    this.voteRequest.postId = this.post.id;
    this.voteRequest.voteType = "UPVOTE";
    this.voteService.vote(this.voteRequest).subscribe(() => {
      this.getUpdatedPost();
    });
  }

  downVote() {
    this.voteRequest.postId = this.post.id;
    this.voteRequest.voteType = "DOWNVOTE";
    this.voteService.vote(this.voteRequest);

    this.voteService.vote(this.voteRequest).subscribe(() => {
      this.getUpdatedPost();
    });
  }

  getUpdatedPost() {
    console.log("Calling updatePost");
    
    this.postService.getPost(this.post.id).subscribe((resp) => {
      this.post = resp;
    }, (err) => {
      console.log(err);
    })
  }
}


