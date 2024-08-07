import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  loginForm: FormGroup;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['Angular2006@gmail.com', [Validators.required, Validators.email]],
      password: ['2702364', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response?.message === 'success') {
            this._router.navigateByUrl('/home');
          }
        },
        error: (error) => {
          console.error('Error during Login', error);
        },
      });
      // Add subscription to the Subscription object
      // this.subscription.add(loginSubscription);
    } else {
      console.log('Form is not valid');
      console.log(this.loginForm);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // ngOnDestroy() {
  //   // Unsubscribe from all subscriptions
  //   this.subscription.unsubscribe();
  // }
}
