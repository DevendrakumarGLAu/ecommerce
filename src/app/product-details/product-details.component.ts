import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ Add this import

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgIf, 
    RouterModule, 
    NgFor, 
    CommonModule,
    FormsModule  // ✅ Add FormsModule here
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  selectedImage: string = '';
  selectedImageIndex: number = 0;
  quantity: number = 1;
  isLoading = true;
  errorMessage = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private http: HttpClient,
    private title: Title,
    private meta: Meta,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    const productID = Number(slug.split('-')[0]);

    this.http.get<any[]>('assets/product.json').subscribe({
      next: (data) => {
        this.product = data.find(p => p.id === productID);

        if (!this.product) {
          this.errorMessage = 'Product not found!';
          this.isLoading = false;
          return;
        }

        this.selectedImage = this.product.images[0];
        this.selectedImageIndex = 0;

        // Dynamic meta tags
        this.title.setTitle(`${this.product.name} - Firozabad Bangles`);
        this.meta.updateTag({ name: 'description', content: this.product.description });

        // JSON-LD Structured Data
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
            "url": isPlatformBrowser(this.platformId) ? window.location.href : ''
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": this.product.rating || 4,
            "reviewCount": 10
          }
        };

        if (isPlatformBrowser(this.platformId)) {
          this.addJsonLd(jsonLd);
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load product details.';
      },
      complete: () => this.isLoading = false
    });
  }

  private addJsonLd(json: any) {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(json);
    const head = this.el.nativeElement.ownerDocument.head;
    this.renderer.appendChild(head, script);
  }

  selectImage(img: string, index: number) {
    this.selectedImage = img;
    this.selectedImageIndex = index;
  }

  nextImage() {
    if (this.product && this.product.images) {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.product.images.length;
      this.selectedImage = this.product.images[this.selectedImageIndex];
    }
  }

  prevImage() {
    if (this.product && this.product.images) {
      this.selectedImageIndex = (this.selectedImageIndex - 1 + this.product.images.length) % this.product.images.length;
      this.selectedImage = this.product.images[this.selectedImageIndex];
    }
  }

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  openUrl(url?: string) {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      alert('URL not available.');
    }
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  getTotalPrice(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }
}