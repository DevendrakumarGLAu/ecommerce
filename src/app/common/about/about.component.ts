import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Firozabad Bangles",
  "url": "https://yourwebsite.com",
  "logo": "https://yourwebsite.com/assets/favicon.png",
  "sameAs": [
    "https://www.facebook.com/yourpage",
    "https://www.instagram.com/yourprofile",
    "https://www.pinterest.com/yourprofile"
  ],
  "description": "Firozabad Bangles sells authentic handmade bangles directly from Firozabad, the city famous for traditional bangle-making. Each bangle is handcrafted by skilled artisans."
};

  if (isPlatformBrowser(this.platformId)) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}

}
