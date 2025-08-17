import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    debugger
    const productID = this.route.snapshot.paramMap.get('id');
    // const productID = this.extractIdFromSlug(slug);

    if (productID) {
      this.http.get<any[]>('assets/product.json').subscribe(
        (data:any) => {
          this.product = data.find((p:any) => p.id === parseInt(productID));
          if (this.product) {
            // Update the page title and meta tags after product is found
            this.title.setTitle(this.product.name + ' - Firozabad Bangles');
            this.meta.updateTag({
              name: 'description',
              content: this.product.description
            });
          } else {
            this.errorMessage = 'Product not found!';
          }
        },
        (error:Error) => {
          console.error('Error fetching products', error);
          this.errorMessage = 'Failed to load product details. Please try again later.';
        }
      ).add(() => this.isLoading = false); // Set loading state to false after request is done
    } else {
      this.errorMessage = 'Invalid product slug.';
      this.isLoading = false;
    }
  }

  extractIdFromSlug(slug: string | null): string | null {
    return slug?.split('-').pop() || null;
  }

  openUrl(url?: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('URL not available.');
    }
  }
}
