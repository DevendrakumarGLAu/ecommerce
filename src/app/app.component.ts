import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
// import { MainLayerComponent } from './main-layer/main-layer.component';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'firozabadbangles';
  product: any;

  constructor(private titleService: Title, private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
    private route: ActivatedRoute
  ) {

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

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product']; // or API call

    // Set page title & meta dynamically
    this.titleService.setTitle(`${this.product.name} – Firozabad Bangles`);
    this.meta.updateTag({ name: 'description', content: this.product.description });

    // JSON-LD structured data
    const productJsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": this.product.name,
      "image": this.product.images[0],
      "description": this.product.description,
      "brand": "Firozabad Bangles",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": this.product.price,
        "availability": "https://schema.org/InStock"
      }
    };

    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(productJsonLd);
    this.doc.head.appendChild(script);
  }

}
