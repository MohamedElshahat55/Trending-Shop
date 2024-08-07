import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { BrandDto } from '../../types/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  //Inject Http Client
  _http = inject(HttpClient);
  // Base Url
  baseUrl = environment.BASE_URL;

  // Load All Brands
  loadAllBrands() {
    return this._http
      .get<BrandDto>(`${this.baseUrl}/brands`)
      .pipe(map((res) => res.data));
  }
}
