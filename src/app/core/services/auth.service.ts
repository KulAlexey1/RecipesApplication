import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZNBG0d6QdyKDK6LA-ULj6DX_SIyALtc0';

    constructor(private _http: HttpClient) {}

    signUp(email: string, password: string) {
        return this._http.post<AuthResponseData>(this.url, {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }
}
