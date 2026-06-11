import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from './toast.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private sub!: Subscription;

  constructor(
    private toastService: ToastService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.sub = this.toastService.toasts$.subscribe(t => this.toasts = t);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }

  viewCart(): void {
    this.cartService.openCart();
  }

  trackById(_: number, t: Toast): number {
    return t.id;
  }
}
