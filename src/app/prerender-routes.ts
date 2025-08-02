import productData from './data/products';

export function getProductPrerenderParams() {
  return productData.map(product => ({ id: product.id.toString() }));
}
