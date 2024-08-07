import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './pages/product/product.component';
import { CategoryService } from '../categoty/services/category.service';
import { ProductService } from './services/product.service';
import { PaginatorModule } from 'primeng/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SelectboxComponent } from '../share/components/selectbox/selectbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../share/components/search/search.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SkeletonComponent } from '../share/components/skeleton/skeleton.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/services/auth.interceptor';
import { AuthService } from '../auth/services/auth.service';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCardComponent,
    SelectboxComponent,
    SearchComponent,
    ProductDetailsComponent,
    SkeletonComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    PaginatorModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductComponent,
    PaginatorModule,
    NgxPaginationModule,
    SelectboxComponent,
    SearchComponent,
    SkeletonComponent,
    ReactiveFormsModule,
  ],
  providers: [ProductService, CategoryService, AuthService],
})
export class ProductModule {}
