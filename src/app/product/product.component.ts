import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgFor, RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  isLoading: boolean = true;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  trackById(index: number, item: any): number {
  return item.id;
}

  loadProducts(): void {
    if (this.products.length) return;
    this.http.get<any[]>(`assets/product.json?v=${new Date().getTime()}`).subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load product.json', err);
        this.snackbar.error('Failed to load products');
        this.isLoading = false;
      }
    });
  }
  

  encodeId(id: number): string {
    return btoa(id.toString());
  }

  getProductSlug(product: any): string {
    const nameSlug = product.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
    return `${product.id}-${nameSlug}`;
  }

  viewProductDetails(product: any): void {
    const slug = this.getProductSlug(product);
    if (slug) {
      this.router.navigate(['/product', slug]);
    } else {
      this.snackbar.error('Product not found');
    }
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }
}