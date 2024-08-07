import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';
import { CategotyModule } from '../categoty/categoty.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductRoutingModule } from '../product/product-routing.module';
import { CategotyRoutingModule } from '../categoty/categoty-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { SliderComponent } from './components/slider/slider.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ScrollUpBtnComponent } from './components/scroll-up-btn/scroll-up-btn.component';
import { GalleriaComponent } from './components/galleria/galleria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './pages/cart/cart.component';
import { AuthService } from '../auth/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from '../auth/services/auth.interceptor';
import { OpenModelComponent } from './components/open-model/open-model.component';
import { OrderComponent } from './pages/order/order.component';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    HomeComponent,
    SliderComponent,
    ScrollUpBtnComponent,
    GalleriaComponent,
    CartComponent,
    OpenModelComponent,
    OrderComponent,
    AllOrdersComponent,
  ],
  imports: [
    CommonModule,
    ProductModule,
    AuthModule,
    CategotyModule,
    ProductRoutingModule,
    CategotyRoutingModule,
    CarouselModule,
    HttpClientModule,
    GalleriaModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      progressBar: true,
      progressAnimation: 'decreasing',
    }), // ToastrModule added
  ],
  exports: [
    NavbarComponent,
    HeroComponent,
    HomeComponent,
    ScrollUpBtnComponent,
    OpenModelComponent,
    CartComponent,
    OrderComponent,
    AllOrdersComponent,
    ProductModule,
    AuthModule,
    CategotyModule,
    ProductRoutingModule,
    CategotyRoutingModule,
    CarouselModule,
    HttpClientModule,
    GalleriaModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule, // ToastrModule added
  ],
  providers: [
    AuthService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class ShareModule {}
