import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;

    constructor(private _authService: AuthService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }

        const email = authForm.value.email;
        const password = authForm.value.password;

        if (this.isLoginMode) {
            // do login logic
        } else {
            this._authService.signUp(email, password).subscribe(
                resData => {
                    console.log(resData);
                },
                err => {
                    console.log(err);
                }
            );
        }

        authForm.reset();
    }
}
