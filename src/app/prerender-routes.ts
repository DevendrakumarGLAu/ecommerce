import productData from './data/products';

export function getProductPrerenderParams() {
  return productData.map(product => `/product/${product.id}`);
}