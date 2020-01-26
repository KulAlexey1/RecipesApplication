import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
    private defaultErrorMessage = 'An unknown error occurred!';

    userData: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.userData = angularFireAuth.authState;
    }

    signUp(email: string, password: string): Observable<firebase.auth.UserCredential> {
        return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password))
            .pipe(
                catchError((error) => {
                    if (!error.message) {
                        return throwError(this.defaultErrorMessage);
                    }
                    return throwError(error.message);
                })
            );
    }

    signIn(email: string, password: string): Observable<firebase.auth.UserCredential> {
        return from(this.angularFireAuth.auth.signInWithEmailAndPassword(email, password))
            .pipe(
                catchError((error) => {
                    if (!error.message) {
                        return throwError(this.defaultErrorMessage);
                    }
                    return throwError(error.message);
                })
            );
    }

    signOut() {
        this.angularFireAuth.auth
            .signOut();
    }
}
