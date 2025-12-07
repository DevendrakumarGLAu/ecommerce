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

  constructor(private http: HttpClient, private router: Router,
    private snackbar :SnackbarService
  ) { }

  ngOnInit(): void {
    this.http.get<any[]>(`assets/product.json?v=${new Date().getTime()}`).subscribe({
      next: (data) => this.products = data,
      error: (err) => {
        console.error('Failed to load product.json', err);
      }
    });
  }
  encodeId(id: number): string {
    return btoa(id.toString());
  }

  getProductSlug(product: any): string {
    const nameSlug = product.name
      .toLowerCase()
      .replace(/\s+/g, '-')       // replace spaces with -
      .replace(/[^\w-]+/g, '');   // remove special chars
    return `${product.id}-${nameSlug}`;
  }

  viewProductDetails(product: number): void {
  //  const product = this.products.find(p => p.id === productId);

  //   if (product) {
  //     const encodedId = btoa(productId.toString());
  //     this.router.navigate(['/product'], { queryParams: { id: encodedId } });
  const slug = this.getProductSlug(product);
  if(slug){
    this.router.navigate(['/product', slug]);

    } else {
      this.snackbar.error('Product not found with name:', product);
    }
  }

}
