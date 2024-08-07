import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CategoryDto } from '../../types/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //Inject Http Client
  _http = inject(HttpClient);
  // Base Url
  baseUrl = environment.BASE_URL;

  // Load All categories
  loadAllCategories() {
    return this._http
      .get<CategoryDto>(`${this.baseUrl}/categories`)
      .pipe(map((res) => res.data));
  }
}
