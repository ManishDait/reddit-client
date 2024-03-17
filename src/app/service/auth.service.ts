import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { SignupRequest } from '../model/auth-model';
import { Observable, map, tap } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequest, LoginResponse } from '../model/login-model';
import { environment } from '../../environments/environment';

const AUTH_API = `${environment.API_ENDPOINT}${environment.AUTH_PATH}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  
  constructor(private httpClient:HttpClient, private localStorage: LocalStorageService) { }

  signUp(signupRequest:SignupRequest):Observable<any> {
    return this.httpClient.post(`${AUTH_API}/signup`, signupRequest, {responseType: 'text'})
  }

  login(loginRequest:LoginRequest):Observable<boolean> {
    return this.httpClient.post<LoginResponse>(`${AUTH_API}/login`, loginRequest).pipe(map(data => {
      this.localStorage.store('authToken', data.authToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refereshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      this.loggedIn.emit(true);
      this.username.emit(data.username);

      return true;
    }));
  }

  logout() {
    const refereshTokenRequest = {
      refershToken: this.getRefereshToken(),
      username: this.getUsername()
    }

    this.httpClient.post(`${AUTH_API}/logout`, refereshTokenRequest, {responseType: 'text'}).subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });

    this.localStorage.clear('authToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');

  }

  refereshToken() {
    const refereshTokenRequest = {
      refershToken: this.getRefereshToken(),
      username: this.getUsername()
    }

    return this.httpClient.post<LoginResponse>(`${AUTH_API}/refresh/token`, refereshTokenRequest).pipe(tap(resp => {
      this.localStorage.store('authToken', resp.authToken);
      this.localStorage.store('expiresAt', resp.expiresAt);
    }))
  }

  getJwtToken(): string {
    return this.localStorage.retrieve('authToken')
  }

  getUsername(): string {
    return this.localStorage.retrieve('username')
  }

  getRefereshToken(): string {
    return this.localStorage.retrieve('refreshToken')
  }

  isLoggin():boolean {
    console.log(this.getJwtToken() != null, this.getJwtToken())
    return this.getJwtToken() != null;
  }

}
