import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from '../../validators/custom-validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      },
      { validator: mustMatch('password', 'rePassword') }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this._authService.register(this.registerForm.value).subscribe(
        () => {
          this._router.navigateByUrl('/auth/login');
        },
        (err) => {
          alert('register failed');
        }
      );
      console.log('Form Submitted', this.registerForm.value);
      // Add subscription to the Subscription object
      // this.subscription.add(registerSubscription);
    } else {
      console.log('Form is not valid');
      console.log(this.registerForm);
    }
  }

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('rePassword');
  }
  get phone() {
    return this.registerForm.get('phone');
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    // this.subscription.unsubscribe();
  }
}
