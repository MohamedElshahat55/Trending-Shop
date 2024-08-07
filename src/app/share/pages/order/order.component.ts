import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  constructor(
    private fb: FormBuilder,
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute
  ) {}

  orderForm: FormGroup;
  cartId: string;

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
        city: ['', Validators.required],
      }),
    });

    this._activatedRoute.params.subscribe((param) => {
      this.cartId = param['_id'] as string;
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this._cartService.checkout(this.cartId, this.orderForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.open(res.session.url);
          }
        },
      });
      console.log(this.orderForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  get details() {
    return this.orderForm.get('shippingAddress.details');
  }
  get phone() {
    return this.orderForm.get('shippingAddress.phone');
  }
  get city() {
    return this.orderForm.get('shippingAddress.city');
  }
}
