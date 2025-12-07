import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'OK', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'] // Custom success styling
    });
  }

  error(message: string, duration: number = 5000) {
    this.snackBar.open(message, 'Close', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'] // Custom error styling
    });
  }
}
