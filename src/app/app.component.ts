import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayerComponent } from './main-layer/main-layer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainLayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firozabadbangles';
}
