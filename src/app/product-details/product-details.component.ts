import {  NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {  Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product: any;
  isLoading = true;
  errorMessage = '';
  selectedImage: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private http: HttpClient,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    if (this.product && this.product.images.length) {
      this.selectedImage = this.product.images[0];
    }
    const encodedId = this.route.snapshot.paramMap.get('id');
  
    // const encoded = this.route.snapshot.queryParamMap.get('id');
    if (encodedId) {
      const decoded = encodedId ? atob(encodedId) : null;
      // const decoded = atob(encoded);           // decode Base64
      const productID = Number(decoded);
      this.http.get<any[]>('assets/product.json').subscribe(
        (data) => {
          this.product = data.find(p => p.id === productID);
          if (this.product) {
            // SEO updates
            this.title.setTitle(`${this.product.name} - Firozabad Bangles`);
            this.meta.updateTag({
              name: 'description',
              content: this.product.description
            });
          } else {
            this.errorMessage = 'Product not found!';
          }
        },
        (error) => {
          console.error('Error fetching products', error);
          this.errorMessage = 'Failed to load product details.';
        }
      ).add(() => (this.isLoading = false));

    } else {
      this.errorMessage = 'Invalid product ID.';
      this.isLoading = false;
    }
  }

  openUrl(url?: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('URL not available.');
    }
  }
selectImage(img: string) {
    this.selectedImage = img;
  }
}
