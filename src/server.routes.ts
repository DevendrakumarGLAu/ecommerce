import { ServerRoute, RenderMode } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server }, 
  { path: 'products', renderMode: RenderMode.Server }, 
  { path: 'products/:id', renderMode: RenderMode.Server
    // 👈 SSR only, no prerendering 
    }
    ];
