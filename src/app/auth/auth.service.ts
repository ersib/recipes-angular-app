import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string
    token: string,
    refreshToken: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    expirationInterval = 600;
    private tokenExpirationTimer: any;


    constructor(private http: HttpClient, private router: Router) {}

    authUrl = 'https://dummyjson.com/auth/login';  // Valid credentials emilys, emilyspass

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.authUrl, {
            username: email,
            password: password
        })
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.id, resData.token);
        }));
    }

    private handleAuthentication(email: string, id: string, token: string) {
        const expirationDate = new Date(new Date().getTime() + this.expirationInterval * 1000);
        const user = new User(email, id, token, expirationDate);
        this.user.next(user);
        this.autoLogout(this.expirationInterval * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    
    signin(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.authUrl, {
            username: email,
            password: password
        })
        .pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.id, resData.token);
        }));
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log("errorRes", errorRes);
        let errorMessage = 'An unkonow error occurred';

        if(!errorRes.error) {
            return throwError(errorMessage);
        }

        switch(errorRes.error.message) {
            case "Invalid credentials":
                errorMessage = "The credentials are invalid!"
                break;
        }
        return throwError(errorMessage);
    }

    autoLogin() {
        const userData: {
            email: string, 
            id: string, 
            _token: string,
             _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
       
        if (!userData)
            return;
        
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.user.next(loadedUser);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        console.log("expirationDuration", expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration);
    }

}