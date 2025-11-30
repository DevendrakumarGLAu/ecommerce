import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  selectedImage: string = '';
  isLoading = true;
  errorMessage = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private http: HttpClient,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    const encodedId = this.route.snapshot.paramMap.get('id');
    if (!encodedId) {
      this.errorMessage = 'Invalid product ID.';
      this.isLoading = false;
      return;
    }

    const decoded = atob(encodedId);
    const productID = Number(decoded);

    this.http.get<any[]>('assets/product.json').subscribe({
      next: (data) => {
        this.product = data.find(p => p.id === productID);

        if (!this.product) {
          this.errorMessage = 'Product not found!';
          this.isLoading = false;
          return;
        }

        // Set default selected image
        this.selectedImage = this.product.images[0];

        // Dynamic meta tags
        this.title.setTitle(`${this.product.name} - Firozabad Bangles`);
        this.meta.updateTag({ name: 'description', content: this.product.description });

        // Inject JSON-LD structured data
        const jsonLd = {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": this.product.name,
          "image": this.product.images,
          "description": this.product.description,
          "brand": "Firozabad Bangles",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": this.product.price,
            "availability": "https://schema.org/InStock",
            "url": window.location.href
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": this.product.rating || 4,
            "reviewCount": 10
          }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(jsonLd);
        document.head.appendChild(script);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load product details.';
      },
      complete: () => this.isLoading = false
    });
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  openUrl(url?: string) {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('URL not available.');
    }
  }
}
