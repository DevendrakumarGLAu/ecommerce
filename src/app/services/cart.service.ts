import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'my_cart';

  private cartOpen = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpen.asObservable();

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    this.loadCart();
  }

  openCart() {
    this.cartOpen.next(true);
  }

  closeCart() {
    this.cartOpen.next(false);
  }

  toggleCart() {
    this.cartOpen.next(!this.cartOpen.value);
  }

  loadCart() {
    const data = localStorage?.getItem(this.storageKey);

    if (data) {
      this.cartItems.next(JSON.parse(data));
    }
  }

  saveCart(items: CartItem[]) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(items)
    );

    this.cartItems.next(items);
  }

  addToCart(product: any, quantity: number = 1) {

    const items = [...this.cartItems.value];

    const existing = items.find(
      item => item.id === product.id
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      });
    }

    this.saveCart(items);
  }

  removeItem(id: number) {

    const items = this.cartItems.value.filter(
      item => item.id !== id
    );

    this.saveCart(items);
  }

  updateQuantity(id: number, qty: number) {

    const items = [...this.cartItems.value];

    const item = items.find(
      x => x.id === id
    );

    if (!item) return;

    if (qty <= 0) {
      this.removeItem(id);
      return;
    }

    item.quantity = qty;

    this.saveCart(items);
  }

  clearCart() {
    localStorage?.removeItem(this.storageKey);
    this.cartItems.next([]);
  }

  getTotalQuantity(): number {
    return this.cartItems.value.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }
}