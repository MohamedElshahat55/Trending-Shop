import { UserDto } from './../../types/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../../types/user';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  tap,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const AUTH_DATA = 'auth_data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Inject Http Client
  _http = inject(HttpClient);
  //Inject Toastr
  _toastr = inject(ToastrService);
  // inject Router
  _router = inject(Router);
  // Base Url
  baseUrl = environment.BASE_URL;

  //? Subjects
  subject = new BehaviorSubject<any>(null);
  authObservable: Observable<any> = this.subject.asObservable();

  //?Observables
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isLoggedIn$ = this.authObservable.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);
    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  //Register
  register(value: User): Observable<UserDto | null> {
    return this._http.post<UserDto>(`${this.baseUrl}/auth/signup`, value).pipe(
      tap((user) => {
        this._toastr.success('Registerition  successful!', 'Success');
      }),
      shareReplay(),
      catchError((error) => {
        console.error('Register error:', error);
        this._toastr.error(error.error.message);
        return of(null); // Handle the error by returning a null observable
      })
    );
  }
  //Login
  login(value: User): Observable<UserDto | null> {
    return this._http.post<UserDto>(`${this.baseUrl}/auth/signin`, value).pipe(
      tap((user) => {
        localStorage.setItem(AUTH_DATA, JSON.stringify(user));
        this.subject.next(user);
        this._toastr.success('Login successful!', 'Success');
        this._router.navigate(['/home']); // Navigate to the home page upon successful login
      }),
      shareReplay(),
      catchError((error) => {
        console.error('Login error:', error);
        this._toastr.error(error.error.message || 'Login failed');
        return of(null); // Handle the error by returning a null observable
      })
    );
  }

  //Logout
  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
    this._toastr.info('Logout successful');
  }

  // Get Token from LocalStorage
  getToken(): string | null {
    const user = localStorage.getItem(AUTH_DATA)
      ? JSON.parse(localStorage.getItem(AUTH_DATA)!)
      : null;
    return user ? user.token : null;
  }
}
