import { Category } from './category.model';

export type StockStatus = 'in_stock' | 'out_of_stock' | 'preorder';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type MarketplacePlatform = 'amazon' | 'flipkart' | 'meesho' | 'myntra' | 'snapdeal' | 'other';

export const MARKETPLACE_PLATFORM_LABELS: Record<MarketplacePlatform, string> = {
  amazon: 'Amazon',
  flipkart: 'Flipkart',
  meesho: 'Meesho',
  myntra: 'Myntra',
  snapdeal: 'Snapdeal',
  other: 'Other'
};

export interface ProductImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

export interface MarketplaceLink {
  id: string;
  platform: MarketplacePlatform;
  custom_label: string | null;
  url: string;
  display_order: number;
}

export interface ProductVideo {
  id: string;
  video_url: string;
  thumbnail_url: string | null;
  caption: string | null;
  display_order: number;
}

/** Lightweight shape returned by the product listing endpoint. */
export interface ProductSummary {
  id: string;
  title: string;
  slug: string;
  brand: string | null;
  category_name: string;
  category_slug: string;
  price: string;
  sale_price: string | null;
  featured: boolean;
  bestseller: boolean;
  new_arrival: boolean;
  stock_status: StockStatus;
  status: ProductStatus;
  og_image: string | null;
  images: ProductImage[];  
  created_at: string;
}

/** Full shape returned by the single-product endpoint. */
export interface Product extends ProductSummary {
  category: Category;
  short_description: string | null;
  description: string | null;
  sku: string | null;
  seo_title: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  schema_json: Record<string, unknown> | null;
  images: ProductImage[];
  videos: ProductVideo[];
  marketplace_links: MarketplaceLink[];
  updated_at: string;
}

export type GalleryMediaType = 'image' | 'video';

/** A unified gallery entry so the PDP can show images and videos in one carousel. */
export interface GalleryItem {
  type: GalleryMediaType;
  url: string;
  alt: string;
}

/** Builds a single ordered gallery from a product's images followed by its videos. */
export function buildGallery(product: Product): GalleryItem[] {
  const imageItems: GalleryItem[] = product.images.map((img) => ({
    type: 'image',
    url: img.image_url,
    alt: img.alt_text ?? product.title
  }));
  const videoItems: GalleryItem[] = product.videos.map((vid) => ({
    type: 'video',
    url: vid.video_url,
    alt: vid.caption ?? product.title
  }));
  return [...imageItems, ...videoItems];
}

export interface ProductFilters {
  search?: string;
  category_id?: string;
  category_slug?: string;
  brand?: string;
  featured?: boolean;
  bestseller?: boolean;
  new_arrival?: boolean;
  stock_status?: StockStatus;
  status?: ProductStatus;
  price_min?: number;
  price_max?: number;
}

/** Helper: the price actually being charged (sale price if present, else the regular price). */
export function effectivePrice(product: ProductSummary): number {
  return Number(product.sale_price ?? product.price);
}

/** Helper: percentage discount, or 0 if there's no active sale price. */
export function discountPercent(product: ProductSummary): number {
  const price = Number(product.price);
  const salePrice = product.sale_price ? Number(product.sale_price) : null;
  if (!salePrice || !price || salePrice >= price) {
    return 0;
  }
  return Math.round((1 - salePrice / price) * 100);
}
