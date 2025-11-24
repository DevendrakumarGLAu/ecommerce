import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgFor, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('assets/product.json').subscribe({
      next: (data) => this.products = data,
      error: (err) => {
        console.error('Failed to load product.json', err);
      }
    });
  }

  viewProductDetails(productId: number): void {
    const product = this.products.find(p => p.id === productId);

    if (product) {
      // console.log('Product details:', product);
      const encodedId = btoa(productId.toString());
      // this.router.navigate(['/product', productId]);
      this.router.navigate(
        ['/product'],
        { queryParams: { id: encodedId } }
      );
    } else {
      console.error('Product not found with ID:', productId);
    }
  }

}
