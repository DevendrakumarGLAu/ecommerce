import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SharedModule } from '../../shareModules';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,SharedModule,RouterModule,
     MatMenuModule,      // ✅ for <mat-menu>
    MatButtonModule,    // ✅ for mat-button
    MatIconModule,      // ✅ for mat-icon
    MatToolbarModule,   // ✅ for <mat-toolbar>
    MatTabsModule,      // ✅ for <mat-tab-group>
    MatFormFieldModule, // ✅ for mat-form-field
    MatInputModule  
  ],
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
