import { ServerRoute, RenderMode } from '@angular/ssr';
import { readFile } from 'fs/promises'; import { join } from 'path'; 
export const serverRoutes: ServerRoute[] = [ {
  path: 'products/:id', renderMode: RenderMode.Prerender,
  getPrerenderParams: async () =>
    {
      // Resolve the path to the product.json file relative to your server root
      const jsonPath = join(process.cwd(), 'src', 'assets', 'product.json'); // Read and parse product.json 
      const fileContents = await readFile(jsonPath, 'utf-8'); 
      const products = JSON.parse(fileContents); 
      // Return an array of params objects with `id` as string
      return products.map((p: any) => ({ id: p.id.toString() })); 
    }
} 
];
