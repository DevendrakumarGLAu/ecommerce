import { Injectable } from '@angular/core';
import { ToastService } from '../common/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private toast: ToastService) {}

  success(message: string, duration = 3000): void {
    this.toast.success(message, duration);
  }

  error(message: string, duration = 4000): void {
    this.toast.error(message, duration);
  }
}
