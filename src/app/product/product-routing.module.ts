import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductResolver } from './services/product.resolver';

const routes: Routes = [
  { path: '', component: ProductComponent },
  {
    path: ':id',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductResolver],
})
export class ProductRoutingModule {}
