import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  isDarkMode = false;

  constructor() {
    this.isDarkMode = localStorage.getItem('dark-mode') === 'true';
    this.applyDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('dark-mode', this.isDarkMode.toString());
    this.applyDarkMode();
  }

  applyDarkMode() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  get isDark(): boolean {
    return this.isDarkMode;
  }
}
