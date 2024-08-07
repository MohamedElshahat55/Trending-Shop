import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../categoty/services/category.service';
import { map, Observable, Subscription } from 'rxjs';
import { Category } from '../../../types/category';
import { Product, ProductDto } from '../../../types/product';
import { PaginatorState } from 'primeng/paginator';
import { BrandService } from '../../../share/services/brand.service';
import { Brand, BrandDto } from '../../../types/brand';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, OnDestroy {
  //?Services
  // Inject Category Service
  _categoryService = inject(CategoryService);
  // Inject Product Service
  _productService = inject(ProductService);
  // Inject Product Service
  _brandServices = inject(BrandService);

  //?Observables
  categories$: Observable<Category[]> =
    this._categoryService.loadAllCategories();

  //?Variables
  products: Product[];
  priceValue: string = '';
  brandValue: string = '';
  productsCount: number = 0;
  searchValue: string;
  pageSize: number = 0;
  currentPage: number = 0;
  total: number = 0;
  brandOptions: Brand[];
  loading = true;

  priceOptions = [
    { _id: '-price', slug: 'Highest Price' },
    { _id: 'price', slug: 'Lowest Price' },
  ];

  ngOnInit(): void {
    //______________PRODUCTS_____________________
    this._productService.loadAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit; //limit
        this.currentPage = response.metadata.currentPage; //currentPage
        this.total = response.results; //total Products
        this.productsCount = response.data.length;
        this.loading = false;
      },
    });
    //______________BRANDS________________________
    this._brandServices.loadAllBrands().subscribe((res) => {
      this.brandOptions = res;
    });
  }

  // Consume the value of price selectbox
  onValueSelected(value: string) {
    if (value.includes('price' || '-price')) {
      this.priceValue = value;
      this._productService.loadAllProducts(this.priceValue).subscribe({
        next: (response) => {
          this.products = response.data;
          this.loading = false;
        },
      });
    } else {
      this.brandValue = value;
      this._productService
        .gtAllProductsBasedOnBrand(this.brandValue)
        .subscribe({
          next: (response) => {
            this.products = response.data;
            this.loading = false;
          },
        });
    }
  }

  handleSearchValueChange(value: string) {
    this.searchValue = value;
    const searchProductSubscribtion = this._productService
      .searchProducts(this.searchValue)
      .subscribe({
        next: (response) => {
          this.products = response;
          this.productsCount = response.length;
          console.log(response);
          this.loading = false;
        },
      });
  }

  pageChanged(event: any): void {
    this._productService.loadAllProducts(this.priceValue, event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit; //limit
        this.currentPage = response.metadata.currentPage; //currentPage
        this.total = response.results; //total Products
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
  }
}
