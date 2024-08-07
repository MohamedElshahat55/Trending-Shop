import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { LoginRegisterPopupComponent } from './components/login-register-popup/login-register-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginRegisterPopupComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [LoginRegisterPopupComponent, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
})
export class AuthModule {}
