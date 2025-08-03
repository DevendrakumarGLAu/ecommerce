import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone:true,
  imports: [CommonModule, HttpClientModule, NgFor,RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/product.json').subscribe((data:any) => {
      this.products = data;
    });
  }

  viewProductDetails(productId: number) {
    // Fetch product details from JSON (or API)
    this.http.get<any>('assets/product.json').subscribe((data: any[]) => {
      const product = data.find(p => p.id === productId);
      if (product) {
        console.log('Product details:', product);
        this.router.navigate(['/product', productId]);
      } else {
        console.error('Product not found');
      }
    });
  }

}
