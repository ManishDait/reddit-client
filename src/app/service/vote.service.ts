import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { VoteRequest } from '../model/vote-model';
import { Observable } from 'rxjs';
import { PostService } from './post.service';
import { PostResponse } from '../model/post-model';

const vote_API = `${environment.API_ENDPOINT}${environment.VOTE_PATH}`

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private httpClient:HttpClient, private postService:PostService) { }

  vote(request:VoteRequest):Observable<void> {
    return this.httpClient.post<void>(`${vote_API}`, request);
  }

}
