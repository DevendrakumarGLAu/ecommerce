import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ToastService } from '../common/toast/toast.service';
import {
  GalleryItem,
  MARKETPLACE_PLATFORM_LABELS,
  MarketplaceLink,
  Product,
  ProductSummary,
  buildGallery,
  discountPercent,
  effectivePrice
} from '../models/product.model';

type Tab = 'description' | 'specs' | 'reviews' | 'shipping';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor, CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  relatedProducts: ProductSummary[] = [];
  gallery: GalleryItem[] = [];
  selectedIndex = 0;
  quantity = 1;
  isLoading = true;
  errorMessage = '';
  activeTab: Tab = 'description';
  isWishlisted = false;
  platformLabels = MARKETPLACE_PLATFORM_LABELS;

  sampleReviews = [
    { name: 'Priya S.', rating: 5, date: 'Dec 2024', text: 'Absolutely gorgeous! The quality is even better than the photos suggest. Perfect for festive occasions.' },
    { name: 'Anita M.', rating: 5, date: 'Nov 2024', text: 'Ordered for my daughter\'s wedding. Got so many compliments. The craftsmanship is outstanding.' },
    { name: 'Reena K.', rating: 4, date: 'Oct 2024', text: 'Beautiful bangles, arrived well-packaged. Slightly smaller than expected but stunning quality.' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private productService: ProductService,
    private title: Title,
    private meta: Meta,
    private renderer: Renderer2,
    private el: ElementRef,
    private cartService: CartService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';

    this.productService.getBySlug(slug).subscribe({
      next: (product) => {
        this.product = product;
        this.gallery = buildGallery(product);
        this.selectedIndex = 0;

        this.title.setTitle(`${product.title} — Firozabad Bangles`);
        if (product.meta_description || product.short_description) {
          this.meta.updateTag({ name: 'description', content: product.meta_description || product.short_description || '' });
        }

        const jsonLd = {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.title,
          image: product.images.map((img) => img.image_url),
          description: product.description || product.short_description || '',
          brand: 'Firozabad Bangles',
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: effectivePrice(product),
            availability:
              product.stock_status === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: isPlatformBrowser(this.platformId) ? window.location.href : ''
          }
        };

        if (isPlatformBrowser(this.platformId)) {
          this.injectJsonLd(jsonLd);
        }

        this.loadRelatedProducts(product);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Product not found!';
        this.isLoading = false;
      }
    });
  }

  private loadRelatedProducts(product: Product): void {
    this.productService.list({ limit: 5 }, { category_slug: product.category.slug }).subscribe({
      next: (result) => {
        this.relatedProducts = result.items.filter((p) => p.id !== product.id);
      },
      error: () => void 0 // related products are a nice-to-have; ignore failures
    });
  }

  private injectJsonLd(json: unknown): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(json);
    this.renderer.appendChild(this.el.nativeElement.ownerDocument.head, script);
  }

  setTab(tab: Tab): void {
    this.activeTab = tab;
  }

  selectMedia(index: number): void {
    this.selectedIndex = index;
  }

  nextImage(): void {
    if (this.gallery.length) {
      this.selectedIndex = (this.selectedIndex + 1) % this.gallery.length;
    }
  }

  prevImage(): void {
    if (this.gallery.length) {
      this.selectedIndex = (this.selectedIndex - 1 + this.gallery.length) % this.gallery.length;
    }
  }

  get currentMedia(): GalleryItem | undefined {
    return this.gallery[this.selectedIndex];
  }

  increaseQty(): void { if (this.quantity < 10) this.quantity++; }
  decreaseQty(): void { if (this.quantity > 1) this.quantity--; }

  getDisplayPrice(): number {
    return this.product ? effectivePrice(this.product) : 0;
  }

  getTotalPrice(): number {
    return this.product ? effectivePrice(this.product) * this.quantity : 0;
  }

  addToCart(): void {
    if (!this.product) return;
    const cartInput = {
      id: this.product.id,
      name: this.product.title,
      price: effectivePrice(this.product),
      image: this.product.images[0]?.image_url ?? this.product.og_image ?? ''
    };
    this.cartService.addToCart(cartInput, this.quantity);
    this.toast.cart({ name: this.product.title, image: cartInput.image });
  }

  openUrl(url?: string): void {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  }

  linkLabel(link: MarketplaceLink): string {
    return link.platform === 'other' ? link.custom_label || 'Other' : this.platformLabels[link.platform];
  }

  toggleWishlist(): void {
    this.isWishlisted = !this.isWishlisted;
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  getDiscount(): number {
    return this.product ? discountPercent(this.product) : 0;
  }

  get starRange(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getProductDiscount(p: ProductSummary): number {
    return discountPercent(p);
  }

  getRelatedPrice(p: ProductSummary): number {
    return effectivePrice(p);
  }
}
