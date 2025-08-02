import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    const productID = +this.route.snapshot.paramMap.get('id')!;

    this.http.get<any[]>('assets/product.json').subscribe(data => {
      this.product = data.find(p => p.id === productID);
    });
  }

  openUrl(url?: string) {
  if (url) {
    window.open(url, '_blank');
  } else {
    alert('URL not available.');
  }
}


}
