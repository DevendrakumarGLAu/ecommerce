import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../common/loader/loader.component';

@Component({
  selector: 'app-main-layer',
  standalone: true,
  imports: [RouterOutlet,LoaderComponent,HeaderComponent, FooterComponent],
  templateUrl: './main-layer.component.html',
  styleUrl: './main-layer.component.css'
})
export class MainLayerComponent {

}
