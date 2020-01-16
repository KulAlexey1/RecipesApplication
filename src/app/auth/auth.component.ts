import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isSignInMode = true;

    constructor(private _authService: AuthService) {}

    onSwitchMode() {
        this.isSignInMode = !this.isSignInMode;
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }

        const email = authForm.value.email;
        const password = authForm.value.password;

        if (this.isSignInMode) {
            this._authService.signIn(email, password).subscribe(res => {
                console.log('Successfully signed in!', res);
            }, error => {
                console.log('Something is wrong: ', error.message);
            });
        } else {
            this._authService.signUp(email, password).subscribe(res => {
                console.log('Successfully signed up!', res);
            }, error => {
                console.log('Something is wrong: ', error.message);
            });
        }

        authForm.reset();
    }
}
