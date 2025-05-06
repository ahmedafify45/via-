export interface SeoMeta {
  title: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  name_en: string;
  slug: string;
}

export interface PortfolioItem {
  id: number;
  status: string;
  sort: number | null;
  owner: number;
  created_on: string;
  modified_by: number;
  modified_on: string;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  date: string;
  client: string;
  website: string;
  location: string;
  thumbnail: { data: { full_url: string } };
  banner: { data: { full_url: string } };
  seo_meta: SeoMeta;
  seo_meta_en: SeoMeta;
  description_en: string;
  category: string;
}

export interface Portfolio {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  description_en: string;
  thumbnail: string;
  banner: string;
  client: string;
  location: string;
  status: string;
  website: string;
  date: string;
  category: string;
}

export interface PortfolioResponse {
  data: Portfolio[];
  public: boolean;
}

export interface CategoryResponse {
  data: Category[];
  public: boolean;
}
