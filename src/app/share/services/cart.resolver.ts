import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from '../../types/product';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

export class CartResolver implements Resolve<Product> {
  constructor(private _cartService: CartService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> | Promise<Product> {
    const productId: any = route.paramMap.get('id');

    return this._cartService.addProductToCart(productId);
  }
}
