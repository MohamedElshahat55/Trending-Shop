import { DarkModeService } from './../../services/dark-mode.service';
import { CartService } from './../../services/cart.service';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { LoginRegisterPopupComponent } from '../../../auth/components/login-register-popup/login-register-popup.component';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild(LoginRegisterPopupComponent) popup: LoginRegisterPopupComponent;

  constructor(
    public _auth: AuthService,
    private _cartService: CartService,
    private _router: Router,
    private darkModeService: DarkModeService
  ) {}

  cartNumber$: Observable<number | null> = this._cartService.numOfCartItems$;
  isLoggedIn = false;
  isLoggedOut = true;
  ngOnInit(): void {
    this._auth.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
    });

    this._auth.isLoggedOut$.subscribe((res) => {
      this.isLoggedOut = res;
    });
  }

  togglePopup() {
    this.popup.toggleVisibility();
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.darkModeService.isDarkMode;
  }

  logout() {
    this._auth.logout();
    this._cartService.removeUserCart();
    this._router.navigateByUrl('/auth/login');
  }
}
