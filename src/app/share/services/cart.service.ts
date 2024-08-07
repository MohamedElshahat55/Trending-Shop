import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../types/product';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { ApiResponse } from '../../types/cart';
import { OrderInfo } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //Inject Http Client
  _http = inject(HttpClient);

  // Base Url
  baseUrl = environment.BASE_URL;

  //? Subjects
  public subject = new BehaviorSubject<number | null>(null);
  numOfCartItems$: Observable<number | null> = this.subject.asObservable();

  // Add Product To Cart
  addProductToCart(productId: string) {
    return this._http.post<Product>(`${this.baseUrl}/cart`, {
      productId: productId,
    });
  }

  // Get All Products which added in cart
  getProductsInCart() {
    return this._http.get<ApiResponse>(`${this.baseUrl}/cart`).pipe(
      tap((res) => {
        this.subject.next(res.numOfCartItems);
      }),
      shareReplay()
    );
  }

  // Remove Product From Cart
  removeItemFromCart(id: string) {
    return this._http.delete<ApiResponse>(`${this.baseUrl}/cart/${id}`).pipe(
      tap((res) => {
        this.subject.next(res.numOfCartItems);
      })
    );
  }

  // Update the Count of Product
  updateItemCount(id: string, count: number) {
    return this._http
      .put<ApiResponse>(`${this.baseUrl}/cart/${id}`, {
        count: count,
      })
      .pipe(
        tap((res) => {
          this.subject.next(res.numOfCartItems);
        })
      );
  }

  // Clear All Products From User Cart
  removeUserCart() {
    this.subject.next(null);
    return this._http.delete(`${this.baseUrl}/cart`);
  }

  //Create Cash Order
  createCashOrder(cardId: string, shippingAddress: OrderInfo) {
    return this._http.post<OrderInfo>(
      `${this.baseUrl}/orders/${cardId}`,
      shippingAddress
    );
  }

  //Checkout session
  checkout(cardId: string, shippingAddress: OrderInfo) {
    return this._http.post<any>(
      `${this.baseUrl}/orders/checkout-session/${cardId}?url=http://localhost:4200`,
      shippingAddress
    );
  }
  // Get All Orders
  getAllOrders() {
    return this._http.get<any>(`${this.baseUrl}/orders/`);
  }
}
