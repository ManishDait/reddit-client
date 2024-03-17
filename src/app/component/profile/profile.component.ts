import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { GravatarModule } from 'ngx-gravatar';
import { PostResponse } from '../../model/post-model';
import { PostComponent } from '../home/post/post.component';
import { PostService } from '../../service/post.service';
import { CommentResponse } from '../../model/comment-model';
import { CommentService } from '../../service/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [GravatarModule, PostComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  username!: string;

  comments: CommentResponse[] = [];

  posts: PostResponse[] = [];

  constructor(private authService:AuthService, private postService:PostService, private commentService:CommentService, private router:Router) {
    this.username = this.authService.getUsername();
    this.postService.getPostByUsername(this.username).subscribe((res) => {
      this.posts = res;
      this.commentService.getCommentByUsername(this.username).subscribe((resp) => {
        this.comments = resp;
      })
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
