import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, filter, map, Observable, shareReplay } from 'rxjs';
import { Product, ProductDto } from '../../types/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //Inject Http Client
  _http = inject(HttpClient);
  // Base Url
  baseUrl = environment.BASE_URL;

  // Load All Products
  loadAllProducts(price: string = '', pageNumber: number = 1) {
    return this._http
      .get<ProductDto>(
        `${this.baseUrl}/products?sort=${price}&page=${pageNumber}`
      )
      .pipe(shareReplay(1));
  }

  // Get Product By Id
  getProductById(productId: string): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/products/${productId}`);
  }
  // Filter by Price
  gtAllProductsBasedOnBrand(brandId: string = '') {
    return this._http.get<ProductDto>(
      `${this.baseUrl}/products?brand=${brandId}`
    );
  }

  // Search Products
  searchProducts(searchValue: string) {
    return this._http
      .get<ProductDto>(`${this.baseUrl}/products`)
      .pipe(
        map((res) =>
          res.data.filter((product) =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
          )
        )
      );
  }
}
