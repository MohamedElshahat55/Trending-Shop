import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-up-btn',
  templateUrl: './scroll-up-btn.component.html',
  styleUrl: './scroll-up-btn.component.css',
})
export class ScrollUpBtnComponent {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollButton = document.getElementById('scrollUpBtn');
    if (window.pageYOffset > 100) {
      // Show button after scrolling down 300px
      scrollButton?.classList.add('show');
    } else {
      scrollButton?.classList.remove('show');
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
