/** Public, storefront-relevant subset of the site-wide settings singleton. */
export interface SiteSettings {
  site_name: string | null;
  logo: string | null;
  favicon: string | null;
  hero_banner_url: string | null;
  hero_banner_title: string | null;
  hero_banner_subtitle: string | null;
  support_email: string | null;
  support_phone: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  twitter: string | null;
}
