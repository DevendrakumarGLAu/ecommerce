import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '../common/toast/toast.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { SettingsService } from '../services/settings.service';
import { ProductSummary, discountPercent, effectivePrice } from '../models/product.model';
import { SiteSettings } from '../models/settings.model';

export interface CategoryTab {
  name: string;
  slug: string | null;
  count: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  products: ProductSummary[] = [];
  filteredProducts: ProductSummary[] = [];
  categories: CategoryTab[] = [];
  activeCategory = 'All';
  sortBy = 'popularity';
  isLoading = true;
  isAnimating = false;
  wishlist = new Set<string>();
  searchQuery: string | null = null;
  siteSettings: SiteSettings | null = null;

  private destroy$ = new Subject<void>();

  testimonials = [
    {
      name: 'Priya Sharma',
      location: 'New Delhi',
      initials: 'PS',
      text: 'Absolutely stunning bangles! The quality is exceptional and they arrived beautifully packaged. These are even more gorgeous in person. Will definitely order again!',
      rating: 5
    },
    {
      name: 'Anita Patel',
      location: 'Mumbai',
      initials: 'AP',
      text: 'I ordered the crystal bangles set for my daughter\'s wedding and they were absolutely perfect. The craftsmanship is outstanding — exactly what I was looking for.',
      rating: 5
    },
    {
      name: 'Meera Gupta',
      location: 'Jaipur',
      initials: 'MG',
      text: 'Authentic Firozabad craftsmanship at its finest. The glass bangles are so delicate and beautiful. Fast delivery and packed securely. Highly recommend!',
      rating: 5
    },
  ];

  trustBadges = [
    {
      title: 'Genuine Craftsmanship',
      subtitle: 'Made by Firozabad master artisans with decades of heritage',
      svgPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    },
    {
      title: 'Fast & Secure Delivery',
      subtitle: 'Ships within 2–3 business days, fully insured and tracked',
      svgPath: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
    },
    {
      title: '100% Secure Payments',
      subtitle: 'SSL encrypted checkout with all major payment methods accepted',
      svgPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    },
    {
      title: 'Easy Returns',
      subtitle: '7-day hassle-free returns if you\'re not completely satisfied',
      svgPath: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
    },
  ];

  constructor(
    private productService: ProductService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.searchQuery = params.get('search')?.trim() || null;
        this.activeCategory = 'All';
        this.loadProducts();
      });

    this.settingsService.get().subscribe({
      next: (settings) => (this.siteSettings = settings),
      error: () => void 0 // hero banner is a nice-to-have; fall back to the default hero on failure
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(_: number, item: ProductSummary): string {
    return item.id;
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.list(
      { limit: 100, sort: 'created_at', order: 'desc' },
      this.searchQuery ? { search: this.searchQuery } : {}
    ).subscribe({
      next: (result) => {
        this.products = result.items;
        this.buildCategories();
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.toast.error('Failed to load products');
        this.isLoading = false;
      }
    });
  }

  buildCategories(): void {
    const catMap = new Map<string, { slug: string; count: number }>();
    this.products.forEach(p => {
      if (p.category_name) {
        const existing = catMap.get(p.category_name);
        catMap.set(p.category_name, { slug: p.category_slug, count: (existing?.count ?? 0) + 1 });
      }
    });

    const trendingCount = this.products.filter(p => p.bestseller).length;
    const featuredCount = this.products.filter(p => p.featured).length;

    this.categories = [
      { name: 'All', slug: null, count: this.products.length },
      ...Array.from(catMap.entries()).map(([name, { slug, count }]) => ({ name, slug, count })),
    ];

    if (trendingCount > 0) this.categories.push({ name: 'Trending', slug: null, count: trendingCount });
    if (featuredCount > 0) this.categories.push({ name: 'Featured', slug: null, count: featuredCount });
  }

  setCategory(cat: string): void {
    if (this.activeCategory === cat) return;
    this.isAnimating = true;
    this.activeCategory = cat;
    setTimeout(() => {
      this.applyFilters();
      this.isAnimating = false;
    }, 180);
  }

  applyFilters(): void {
    let filtered: ProductSummary[];
    switch (this.activeCategory) {
      case 'Trending':  filtered = this.products.filter(p => p.bestseller); break;
      case 'Featured':  filtered = this.products.filter(p => p.featured); break;
      case 'All':       filtered = [...this.products]; break;
      default:          filtered = this.products.filter(p => p.category_name === this.activeCategory);
    }

    switch (this.sortBy) {
      case 'price-asc':  filtered.sort((a, b) => effectivePrice(a) - effectivePrice(b)); break;
      case 'price-desc': filtered.sort((a, b) => effectivePrice(b) - effectivePrice(a)); break;
      case 'newest':     filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
      default:           break; // "popularity" — no such signal from the API yet, keep server-provided order
    }

    this.filteredProducts = filtered;
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleWishlist(id: string, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.wishlist.has(id)) {
      this.wishlist.delete(id);
      this.toast.wishlist(false);
    } else {
      this.wishlist.add(id);
      this.toast.wishlist(true);
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlist.has(id);
  }

  addToCart(product: ProductSummary, event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const cartInput = {
      id: product.id,
      name: product.title,
      price: effectivePrice(product),
      image: product.og_image ?? ''
    };
    this.cartService.addToCart(cartInput, 1);
    this.toast.cart({ name: product.title, image: product.og_image ?? '' });
  }

  getDisplayPrice(product: ProductSummary): number {
    return effectivePrice(product);
  }

  getDiscount(product: ProductSummary): number {
    return discountPercent(product);
  }

  getBadgeLabel(product: ProductSummary): string | null {
    if (product.bestseller) return 'Bestseller';
    if (product.new_arrival) return 'New';
    if (product.featured) return 'Featured';
    return null;
  }

  clearSearch(): void {
    this.router.navigate(['/']);
  }

  scrollToProducts(): void {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }

  get skeletonItems(): number[] {
    return Array(8).fill(0);
  }

  get starRange(): number[] {
    return [1, 2, 3, 4, 5];
  }
}
