import { Routes } from '@angular/router';
import { MainLayerComponent } from './main-layer/main-layer.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayerComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadComponent: () =>
          import('./product/product.component').then((m) => m.ProductComponent),
      },
    ],
  },
];

