import { ServerRoute, RenderMode } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server }, 
  { path: 'products', renderMode: RenderMode.Server }, 
  { path: 'products/:id', renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => { 
      
      [
        { id: '1' }, 
        { id: '2' }, 
        { id: '3' } 
      ];
    }
    }
    ];
