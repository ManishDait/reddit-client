import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommentRequest, CommentResponse } from '../model/comment-model';


const COMMENT_API = `${environment.API_ENDPOINT}${environment.COMMENT_PATH}`;

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getComment(id:number):Observable<CommentResponse[]> {
    return this.httpClient.get<CommentResponse[]>(`${COMMENT_API}/by-post/${id}`);
  }

  getCommentByUsername(username:string):Observable<CommentResponse[]> {
    return this.httpClient.get<CommentResponse[]>(`${COMMENT_API}/by-user/${username}`);
  }

  createComment(request:CommentRequest) {
    return this.httpClient.post(`${COMMENT_API}`, request);
  }

}
