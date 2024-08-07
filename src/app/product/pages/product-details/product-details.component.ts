import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { CartService } from '../../../share/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}
  private subscriptions = new Subscription();
  product: any;
  ngOnInit(): void {
    const productDetailsSubscribtion = this._activatedRoute.data.subscribe(
      (res) => {
        this.product = res['product'].data;
      }
    );
    this.subscriptions.add(productDetailsSubscribtion);
  }

  addProductToCart(productId: string) {
    this._cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this._toastr.success('Added To Cart Successfully');
        this._cartService.subject.next(res.numOfCartItems as number);
      },
      error: () => {
        this._router.navigate(['/auth/login']);
        this._toastr.info('You have to Login First');
      },
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }
}
