import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../common/loader/loader.component';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-main-layer',
  standalone: true,
  imports: [RouterOutlet,NgIf,LoaderComponent,HeaderComponent, FooterComponent],
  templateUrl: './main-layer.component.html',
  styleUrl: './main-layer.component.css'
})
export class MainLayerComponent {

  loading: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }

}
