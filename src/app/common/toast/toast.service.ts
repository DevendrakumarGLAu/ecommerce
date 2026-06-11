import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  type: 'cart' | 'success' | 'error' | 'wishlist';
  message: string;
  productName?: string;
  productImage?: string;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  cart(product: any): void {
    this.add({
      type: 'cart',
      message: 'Added to cart!',
      productName: product.name,
      productImage: product.images?.[0] || '',
      duration: 3500
    });
  }

  success(message: string, duration = 3000): void {
    this.add({ type: 'success', message, duration });
  }

  error(message: string, duration = 4000): void {
    this.add({ type: 'error', message, duration });
  }

  wishlist(added: boolean): void {
    this.add({
      type: 'wishlist',
      message: added ? 'Added to wishlist' : 'Removed from wishlist',
      duration: 2500
    });
  }

  dismiss(id: number): void {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }

  private add(toast: Omit<Toast, 'id'>): void {
    const id = ++this.counter;
    const toasts = [...this.toastsSubject.value, { id, ...toast }];
    this.toastsSubject.next(toasts);
    setTimeout(() => this.dismiss(id), toast.duration);
  }
}
