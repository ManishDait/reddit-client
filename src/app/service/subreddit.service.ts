import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditRequest, SubredditResponse } from '../model/subreddit-model';
import { environment } from '../../environments/environment';

const SUBREDDIT_API = `${environment.API_ENDPOINT}${environment.SUBREDDIT_PATH}`;

@Injectable({
  providedIn: 'root'
})

export class SubredditService {

  constructor(private  httpClient: HttpClient) { }

  getAllSubreddit():Observable<SubredditResponse[]> {
    return this.httpClient.get<SubredditResponse[]>(`${SUBREDDIT_API}`);
  }

  createSubreddit(request:SubredditRequest): Observable<SubredditResponse> {
    return this.httpClient.post<SubredditResponse>(`${SUBREDDIT_API}`, request);
  }

}
