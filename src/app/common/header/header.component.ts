import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isBrowser: boolean;
  searchQuery = '';
  isMobileMenuOpen = false;
  isSearchOpen = false;
  isScrolled = false;
  cartItemCount = 0;

  private destroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private cartService: CartService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItemCount = items.reduce((sum, i) => sum + i.quantity, 0);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 60;
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false;
    this.isSearchOpen = false;
  }

  openCart(): void {
    this.cartService.openCart();
  }

  onSearch(event?: Event): void {
    if (event) event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/'], { queryParams: { search: this.searchQuery.trim() } });
      this.isMobileMenuOpen = false;
      this.isSearchOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) this.isSearchOpen = false;
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) this.isMobileMenuOpen = false;
  }

  isActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '?');
  }
}
