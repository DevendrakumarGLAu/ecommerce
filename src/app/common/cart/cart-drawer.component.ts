import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart-drawer',
  standalone:true,
  imports:[NgFor,NgIf],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css']
})
export class CartDrawerComponent implements OnInit {

  cartOpen = false;
  items: CartItem[] = [];

  private storageKey = 'my_cart';

  ngOnInit() {
    this.loadCart();
  }

  /* -----------------------------
     LOCAL STORAGE FUNCTIONS
  ------------------------------*/

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  loadCart() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.items = JSON.parse(data);
    }
  }

  /* -----------------------------
     CART ACTIONS
  ------------------------------*/

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  closeCart() {
    this.cartOpen = false;
  }

  addItem(product: CartItem) {
    const existing = this.items.find(i => i.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.saveCart();
  }

  updateQuantity(id: number, qty: number) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    if (qty <= 0) {
      this.removeItem(id);
    } else {
      item.quantity = qty;
      this.saveCart();
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem(this.storageKey);
  }

  /* -----------------------------
     GETTERS
  ------------------------------*/

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  get totalQuantity(): number {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }
}
