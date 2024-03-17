import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest, PostResponse } from '../model/post-model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

const POSTS_API = `${environment.API_ENDPOINT}${environment.POSTS_PATH}`;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private httpClient:HttpClient, private authService:AuthService) { }

  getAllPost():Observable<PostResponse[]> {
    const username = this.authService.getUsername()
    if (username != null) {
      return this.httpClient.get<PostResponse[]>(`${POSTS_API}?user=${username}`);
    }
    return this.httpClient.get<PostResponse[]>(`${POSTS_API}?user=`);
  }

  getPost(id:number):Observable<PostResponse> {
    const username = this.authService.getUsername()
    if (username != null) {
      return this.httpClient.get<PostResponse>(`${POSTS_API}/${id}?user=${username}`);
    }
    return this.httpClient.get<PostResponse>(`${POSTS_API}/${id}?user=`);
  }

  getPostBySubreddit(id: number):Observable<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${POSTS_API}/by-subreddit/${id}`);
  }

  getPostByUsername(username:string):Observable<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(`${POSTS_API}/by-user/${username}`)
  }

  createPost(request: PostRequest):Observable<PostResponse> {
    return this.httpClient.post<PostResponse>(`${POSTS_API}`, request);
  }

}
