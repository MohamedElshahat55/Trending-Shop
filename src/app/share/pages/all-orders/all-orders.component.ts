import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent {
  constructor(private _cartService: CartService) {}

  orders: any[];

  ngOnInit(): void {
    this._cartService.getAllOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        console.log(res);
      },
    });
  }
}
