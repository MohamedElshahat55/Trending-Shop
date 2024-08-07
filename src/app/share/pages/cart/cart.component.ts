import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../types/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(
    private _cartService: CartService,
    private _toastr: ToastrService,
    private _Renderer2: Renderer2
  ) {}

  //?Variables
  cartItems: any;
  totalCartPrice: number;
  cartId: string;

  ngOnInit(): void {
    this._cartService.getProductsInCart().subscribe({
      next: (res) => {
        this.cartItems = res.data.products;
        this.cartId = res.data._id;
        this.totalCartPrice = res.data.totalCartPrice;
      },
    });
  }

  removeItemFromCart(id: string) {
    this._cartService.removeItemFromCart(id).subscribe({
      next: (res) => {
        this.cartItems = res.data.products;
        this.totalCartPrice = res.data.totalCartPrice;

        this._toastr.error('Removed item from cart');
        console.log(this.cartItems);
      },
    });
  }

  clearCart() {
    this._cartService.removeUserCart().subscribe({
      next: (res) => {
        this.cartItems = [];
        this.totalCartPrice = 0; // Reset the total cart price as well
      },
    });
  }

  changeCount(
    count: number,
    productId: string,
    el1: HTMLButtonElement,
    el2: HTMLButtonElement
  ): void {
    // this condithin till the quantity never reach to zero
    if (count >= 1) {
      // add attribut by Rendere2
      this._Renderer2.setAttribute(el1, 'disabled', 'true');
      this._Renderer2.setAttribute(el2, 'disabled', 'true');
      this._cartService.updateItemCount(productId, count).subscribe({
        next: (res) => {
          this.cartItems = res.data.products;
          this.totalCartPrice = res.data.totalCartPrice;
          this._Renderer2.removeAttribute(el1, 'disapled');
          this._Renderer2.removeAttribute(el2, 'disapled');
        },
        error: (err) => {
          this._Renderer2.removeAttribute(el1, 'disapled');
          this._Renderer2.removeAttribute(el2, 'disapled');
          console.log(err);
        },
      });
    }
  }
}
