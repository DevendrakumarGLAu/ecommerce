import { Routes } from '@angular/router';
import { MainLayerComponent } from './main-layer/main-layer.component';
// import products from '../app/data/products'; 

export const routes: Routes = [
  {
    path: '',
    component: MainLayerComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '',
        loadComponent: () =>
          import('./product/product.component').then((m) => m.ProductComponent),
      },
      //{ path: 'product/:slug', 
        // loadComponent: () =>
       //  import('./product-details/product-details.component').then((m) => m.ProductDetailsComponent),
       //
       // data: { renderMode: 'dynamic' } 
     //  },
      { path: 'product/:id', 
       loadComponent: () => import('./app/product-details/product-details.component').then(m => m.ProductDetailsComponent), 
       data: { prerender: true }, 
       getPrerenderParams: async () => { // Replace with real data fetch if needed
         return [ 
           { id: '1' },
           { id: '2' },
           { id: '3' }
         ];
       } },
      
    // assuming JSON is stored locally 
      //{ path: 'products/:slug',
    //   loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent), 
      //  data: { renderMode: 'prerender' }, 
      //  getPrerenderParams: () => { return products.map(product =>
      //    { const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      //      .replace(/^-+|-+$/g, '') + '-' + product.id; return { slug }; }); }
      }
  ],
  },
];

