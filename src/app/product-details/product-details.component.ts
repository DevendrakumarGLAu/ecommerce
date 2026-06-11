import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ToastService } from '../common/toast/toast.service';

type Tab = 'description' | 'specs' | 'reviews' | 'shipping';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor, CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  relatedProducts: any[] = [];
  selectedImage = '';
  selectedImageIndex = 0;
  quantity = 1;
  isLoading = true;
  errorMessage = '';
  activeTab: Tab = 'description';
  isWishlisted = false;

  sampleReviews = [
    { name: 'Priya S.', rating: 5, date: 'Dec 2024', text: 'Absolutely gorgeous! The quality is even better than the photos suggest. Perfect for festive occasions.' },
    { name: 'Anita M.', rating: 5, date: 'Nov 2024', text: 'Ordered for my daughter\'s wedding. Got so many compliments. The craftsmanship is outstanding.' },
    { name: 'Reena K.', rating: 4, date: 'Oct 2024', text: 'Beautiful bangles, arrived well-packaged. Slightly smaller than expected but stunning quality.' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private http: HttpClient,
    private title: Title,
    private meta: Meta,
    private renderer: Renderer2,
    private el: ElementRef,
    private cartService: CartService,
    private toast: ToastService
  ) {}

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

        this.relatedProducts = data.filter(p => p.id !== productID);
        this.selectedImage = this.product.images[0];
        this.selectedImageIndex = 0;

        this.title.setTitle(`${this.product.name} — Firozabad Bangles`);
        this.meta.updateTag({ name: 'description', content: this.product.description });

        const jsonLd = {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: this.product.name,
          image: this.product.images,
          description: this.product.description,
          brand: 'Firozabad Bangles',
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: this.product.price,
            availability: 'https://schema.org/InStock',
            url: isPlatformBrowser(this.platformId) ? window.location.href : ''
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: this.product.rating || 4,
            reviewCount: this.product.reviewCount || 10
          }
        };

        if (isPlatformBrowser(this.platformId)) {
          this.injectJsonLd(jsonLd);
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load product details.';
      },
      complete: () => { this.isLoading = false; }
    });
  }

  private injectJsonLd(json: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(json);
    this.renderer.appendChild(this.el.nativeElement.ownerDocument.head, script);
  }

  setTab(tab: Tab): void {
    this.activeTab = tab;
  }

  selectImage(img: string, index: number): void {
    this.selectedImage = img;
    this.selectedImageIndex = index;
  }

  nextImage(): void {
    if (this.product?.images) {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.product.images.length;
      this.selectedImage = this.product.images[this.selectedImageIndex];
    }
  }

  prevImage(): void {
    if (this.product?.images) {
      this.selectedImageIndex = (this.selectedImageIndex - 1 + this.product.images.length) % this.product.images.length;
      this.selectedImage = this.product.images[this.selectedImageIndex];
    }
  }

  increaseQty(): void { if (this.quantity < 10) this.quantity++; }
  decreaseQty(): void { if (this.quantity > 1) this.quantity--; }

  getTotalPrice(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    this.toast.cart(this.product);
  }

  openUrl(url?: string): void {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  getDiscount(): number {
    if (!this.product) return 0;
    if (this.product.discount) return this.product.discount;
    if (this.product.mrp && this.product.price && this.product.mrp > this.product.price) {
      return Math.round((1 - this.product.price / this.product.mrp) * 100);
    }
    return 0;
  }

  get starRange(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getProductSlug(p: any): string {
    const name = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `${p.id}-${name}`;
  }

  getProductDiscount(p: any): number {
    if (!p) return 0;
    if (p.discount) return p.discount;
    if (p.mrp && p.price && p.mrp > p.price) {
      return Math.round((1 - p.price / p.mrp) * 100);
    }
    return 0;
  }
}
