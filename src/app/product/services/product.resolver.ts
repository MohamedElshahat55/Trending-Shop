import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from '../../types/product';
import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(private _productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> | Promise<Product> {
    const productId: any = route.paramMap.get('id');

    return this._productService.getProductById(productId);
  }
}
