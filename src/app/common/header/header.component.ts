import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SharedModule } from '../../shareModules';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,SharedModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onTabChange(event: any) {
    const index = event.index;
    switch(index) {
      case 1:
        this.router.navigate(['/about-us']);
        break;
      case 2:
        this.router.navigate(['/']);
        break;
      case 3:
        this.router.navigate(['/']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}
