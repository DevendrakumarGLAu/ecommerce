import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css']
})
export class CartDrawerComponent implements OnInit, OnDestroy {

  cartOpen = false;
  items: CartItem[] = [];

  private destroy$ = new Subject<void>();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(open => this.cartOpen = open);

    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => this.items = items);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleCart() {
    this.cartService.toggleCart();
  }

  closeCart() {
    this.cartService.closeCart();
  }

  updateQuantity(id: number, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  get totalQuantity(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }
}
