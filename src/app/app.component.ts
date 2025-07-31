import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayerComponent } from './main-layer/main-layer.component';

  import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainLayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firozabadbangles';


constructor(private title: Title, private meta: Meta) {
  this.title.setTitle('Firozabad Bangles - Handmade Glass Bangles');

  this.meta.addTags([
    { name: 'description', content: 'Buy beautiful handmade bangles from Firozabad. Traditional, colorful, and elegant.' },
    { name: 'keywords', content: 'firozabad bangles, handmade bangles, glass bangles, traditional bangles' },
    { name: 'author', content: 'Firozabad Bangles' },
    { name: 'robots', content: 'index, follow' },
  ]);
}

}
