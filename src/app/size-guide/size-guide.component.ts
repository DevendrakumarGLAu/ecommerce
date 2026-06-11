import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CONTACT } from '../contact.config';

interface SizeRow {
  size: string;
  diameter: string;
  circumference: string;
  fits: string;
}

@Component({
  selector: 'app-size-guide',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './size-guide.component.html',
  styleUrls: ['./size-guide.component.css']
})
export class SizeGuideComponent {
  readonly contact = CONTACT;
  activeMethod: 'string' | 'paper' | 'existing' = 'string';

  sizeChart: SizeRow[] = [
    { size: '2/0',  diameter: '38 mm', circumference: '119 mm', fits: 'XS — petite wrist' },
    { size: '2/2',  diameter: '40 mm', circumference: '126 mm', fits: 'S — slim wrist' },
    { size: '2/4',  diameter: '42 mm', circumference: '132 mm', fits: 'S–M — average wrist' },
    { size: '2/6',  diameter: '44 mm', circumference: '138 mm', fits: 'M — standard wrist' },
    { size: '2/8',  diameter: '46 mm', circumference: '145 mm', fits: 'M–L — wider wrist' },
    { size: '2/10', diameter: '48 mm', circumference: '151 mm', fits: 'L — large wrist' },
    { size: '2/12', diameter: '50 mm', circumference: '157 mm', fits: 'XL — extra large' },
    { size: '2/14', diameter: '52 mm', circumference: '163 mm', fits: 'XXL — full wrist' },
  ];

  tips = [
    { icon: 'M12 3v1m0 16v1M3 12h1m16 0h1M5.636 5.636l.707.707m11.314 11.314l.707.707M5.636 18.364l.707-.707m11.314-11.314l.707-.707', title: 'Measure in the morning', text: 'Hands are slightly swollen in the evening. Measure in the morning for the most accurate fit.' },
    { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title: 'When between sizes', text: 'Always go one size up. Bangles should slide over the knuckles with slight resistance.' },
    { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Stack sizing', text: 'For stacking multiple bangles, use the same size or one size up from your single-bangle measurement.' },
  ];

  setMethod(m: 'string' | 'paper' | 'existing'): void {
    this.activeMethod = m;
  }
}
