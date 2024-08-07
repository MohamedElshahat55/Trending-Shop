import { Component, inject, Input, OnDestroy } from '@angular/core';
import { Product } from '../../../types/product';
import { CartService } from '../../../share/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product: Product;

  // Inject the cart service
  _cartService = inject(CartService);
  // Inject the toastr service
  _toastr = inject(ToastrService);

  addProductToCart(productId: string) {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this._toastr.success('Added To Cart Successfully');
        this._cartService.subject.next(res.numOfCartItems as number);
      },
      error: () => {
        this._toastr.info('You have to Login First');
      },
    });
  }
}
