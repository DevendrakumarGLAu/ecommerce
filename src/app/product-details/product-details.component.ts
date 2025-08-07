import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone:true,
  imports: [NgIf, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product: any;
  constructor(private route: ActivatedRoute, private http: HttpClient,private title: Title, private meta: Meta){}

  ngOnInit(): void {
    //const productID = +this.route.snapshot.paramMap.get('id')!;
    const slug = this.route.snapshot.paramMap.get('slug');
    const productID  = this.extractIdFromSlug(slug);

    this.http.get<any[]>('assets/product.json').subscribe(data => {
      this.product = data.find(p => p.id === productID);
    });
    this.title.setTitle(this.product.name + ' - Firozabad bangles'); 
    this.meta.updateTag({ name: 'description', content: this.product.description });
  }

extractIdFromSlug(slug: string | null): string | null {
  return slug?.split('-').pop() || null;
  }
  

  openUrl(url?: string) {
  if (url) {
    window.open(url, '_blank');
  } else {
    alert('URL not available.');
  }
}


}
