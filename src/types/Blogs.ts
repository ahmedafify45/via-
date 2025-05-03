export interface Blog {
  id: number;
  title: string;
  title_en: string;
  slug: string;
  description: string;
  description_en: string;
  thumbnail: { data: { full_url: string } };
  thumbnail_en: { data: { full_url: string } };
  created_on: string;
  category: {
    id: number;
    title: string;
    title_en: string;
    slug: string;
  };
  tags: string;
  tags_en: string | null;
  seo_meta: {
    title: string;
    description: string;
  };
  seo_meta_en: {
    title: string;
    description: string;
  };
}

export interface Category {
  id: number;
  title: string;
  title_en: string;
}
