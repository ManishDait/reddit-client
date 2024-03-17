import { Component, Input } from '@angular/core';
import { VoteComponent } from '../vote/vote.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostResponse } from '../../../model/post-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    VoteComponent, 
    FontAwesomeModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!: PostResponse;
  faComment = faComments;

  constructor (private router:Router) {

  }

  viewPost(id: number) {
    this.router.navigate(['view-post'], {queryParams: {id: id}});
  }

  
}
