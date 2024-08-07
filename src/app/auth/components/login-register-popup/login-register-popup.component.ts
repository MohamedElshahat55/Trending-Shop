import { Component } from '@angular/core';

@Component({
  selector: 'app-login-register-popup',
  templateUrl: './login-register-popup.component.html',
  styleUrl: './login-register-popup.component.css',
})
export class LoginRegisterPopupComponent {
  isVisible = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
