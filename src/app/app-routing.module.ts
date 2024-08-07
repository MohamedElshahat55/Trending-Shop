import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './share/pages/home/home.component';
import { CartComponent } from './share/pages/cart/cart.component';
import { OrderComponent } from './share/pages/order/order.component';
import { AllOrdersComponent } from './share/pages/all-orders/all-orders.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order/:_id', component: OrderComponent },
  { path: 'allorders', component: AllOrdersComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./categoty/categoty.module').then((m) => m.CategotyModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
