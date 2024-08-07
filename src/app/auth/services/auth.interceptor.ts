import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this._authService.getToken();
    if (authToken) {
      const authReq = request.clone({
        setHeaders: {
          token: authToken,
        },
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
