import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "./service/auth.service";
import { LoginResponse } from "./model/login-model";

@Injectable({
    providedIn: 'root'
})
export class TokenTnterceptor implements HttpInterceptor {
    isTokenRefereshing: boolean = false;
    refereshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor (private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.authService.getJwtToken();
        console.log("JWT token added", req);
        
        if (jwt) {
            this.addToken(req, jwt);
        }

        return next.handle(req).pipe(catchError(err => {
            if(err instanceof HttpErrorResponse && err.status === 403) {
                return this.handleAuthError(req, next);
            } else {
                return throwError(err);
            }
        }));
    }

    handleAuthError(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isTokenRefereshing) {
            this.isTokenRefereshing = true;
            //this.refereshTokenSubject.next(null);

            return this.authService.refereshToken().pipe(
                switchMap((refershTokenResponse: LoginResponse) => {
                    this.isTokenRefereshing = false;
                    //this.refereshTokenSubject.next(refershTokenResponse.authToken);
                    return next.handle(this.addToken(req, refershTokenResponse.authToken));
                })
            )
        }

        return next.handle(req);
    }

    addToken(req: HttpRequest<any>, jwt: string) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + jwt)
        });
    }
    
}