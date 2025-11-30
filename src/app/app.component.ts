import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { MainLayerComponent } from './main-layer/main-layer.component';

import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firozabadbangles';


  constructor(private titleService: Title, private meta: Meta) {

    this.titleService.setTitle('Handmade Firozabad Bangles – Traditional & Festive Wear');
    this.meta.addTags([
      {
        name: 'description',
        content: 'Explore beautiful handmade Firozabad bangles — traditional, colorful & elegant designs perfect for festivals, weddings and daily wear. Shop now!'
      },
      {
        name: 'keywords',
        content: 'Firozabad bangles, handmade bangles, glass bangles, ethnic bangles, festive bangles'
      },
      { name: 'author', content: 'Firozabad Bangles' },
      { name: 'robots', content: 'index, follow' },
    ]);
  }


}
