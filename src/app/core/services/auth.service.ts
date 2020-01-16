import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    userData: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth) {
        this.userData = angularFireAuth.authState;
    }

    signUp(email: string, password: string): Observable<firebase.auth.UserCredential> {
        return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password));
    }

    signIn(email: string, password: string): Observable<firebase.auth.UserCredential> {
        return from(this.angularFireAuth.auth.signInWithEmailAndPassword(email, password));
    }

    signOut() {
        this.angularFireAuth.auth
            .signOut();
    }
}
