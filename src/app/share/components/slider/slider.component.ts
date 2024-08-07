import { Component, inject } from '@angular/core';
import { ProductService } from '../../../product/services/product.service';
import { map, Observable } from 'rxjs';
import { Product } from '../../../types/product';
import { CategoryService } from '../../../categoty/services/category.service';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  //?Inject Product Service
  _productService = inject(ProductService);
  //?Inject Category Service
  _categoryService = inject(CategoryService);

  //?Variables
  responsiveOptions: any[] | undefined;
  Products$: Observable<Product[]> = this._productService
    .loadAllProducts()
    .pipe(map((res) => res.data));
  categories$: Observable<Category[]> =
    this._categoryService.loadAllCategories();

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
