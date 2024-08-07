import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../product/services/product.service';
import { filter, map, pipe, tap } from 'rxjs';
import { CategoryService } from '../../../categoty/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // Inject Product Service
  _productService = inject(ProductService);
  // Inject Category Service
  _categoryService = inject(CategoryService);

  ngOnInit(): void {
    //this._productService.AllProducts().subscribe(console.log);
    //this._categoryService.loadAllCategories().subscribe(console.log);
  }
}
