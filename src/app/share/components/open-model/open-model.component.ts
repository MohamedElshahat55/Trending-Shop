import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-open-model',
  templateUrl: './open-model.component.html',
  styleUrl: './open-model.component.css',
})
export class OpenModelComponent implements OnInit {
  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _cartService: CartService) {}

  isModalOpen = false;
  isModalVisible = false;
  cartItems: any;

  ngOnInit(): void {
    this.cartItems;
  }
  openModal() {
    this.isModalOpen = true;
    setTimeout(() => {
      this.isModalVisible = true;
    }, 10);
  }

  closeModal() {
    this.isModalVisible = false;
    setTimeout(() => {
      this.isModalOpen = false;
    }, 10);
  }

  clearCart() {
    this.clear.emit();
    this.closeModal();
  }
}
