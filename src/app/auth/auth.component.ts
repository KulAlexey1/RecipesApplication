import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isSignInMode = true;
    isLoading = false;
    error = '';

    constructor(private _authService: AuthService) {}

    onSwitchMode() {
        this.isSignInMode = !this.isSignInMode;
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }

        this.isLoading = true;
        
        const email = authForm.value.email;
        const password = authForm.value.password;

        if (this.isSignInMode) {
            this._authService.signIn(email, password)
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                    })
                ).subscribe(res => {
                    console.log('Successfully signed in!', res);
                }, errorMessage => {
                    this.error = errorMessage;                 
                });
        } else {
            this._authService.signUp(email, password)
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                    })
                ).subscribe(res => {
                    console.log('Successfully signed up!', res);
                }, errorMessage => {
                    this.error = errorMessage;
                });
        }

        authForm.reset();
    }
}
