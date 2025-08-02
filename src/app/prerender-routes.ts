import productData from './data/products';

export function getPrerenderProductRoutes() {
  return productData.map(product => `/product/${product.id}`);
}