import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isBrowser: boolean;
  searchQuery: string = '';
  activeRoute: string = '';
  isMobileMenuOpen: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.activeRoute = this.router.url;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.activeRoute = route;
    this.isMobileMenuOpen = false;
  }

  onSearch(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      
      // Option 1: Navigate to home with search query (if you don't have a dedicated search page)
      this.router.navigate(['/'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
      
      // Option 2: If you have a search route, uncomment below
      // this.router.navigate(['/search'], { 
      //   queryParams: { q: this.searchQuery.trim() } 
      // });
      
      // Close mobile menu if open
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  isActive(route: string): boolean {
    return this.activeRoute === route || this.router.url === route;
  }
}