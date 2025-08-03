import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import path from 'path';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

app.get('/product/:id', (req, res) => {
  const id = req.params.id;
  res.render('index', { 
    req, 
    res,
    url: `/product/${id}`,
  });
});


app.get('/prerender', async (req, res) => {
  try {
    // Read the products data from a local JSON file (you can replace this with a database call)
    const productData = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'data/products.json'), 'utf-8')
    );

    // Generate the prerender URLs dynamically
    const prerenderedUrls = productData.map((product: { id: number }) => {
      return `/product/${product.id}`;
    });

    // Send the prerendered URLs as a response
    res.json({ prerenderedUrls });
  } catch (error) {
    console.error('Error reading product data for prerendering:', error);
    res.status(500).json({ error: 'Failed to generate prerender URLs' });
  }
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
