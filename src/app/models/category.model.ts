export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  seo_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  created_at: string;
  updated_at: string;
}
