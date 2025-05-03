export interface Service {
  id: number;
  name: string;
  name_en: string;
  slug: string;
  summary: string;
  summary_en: string;
  description: string;
  description_en: string;
  photo: { data: { full_url: string } };
  banner: { data: { full_url: string } };
  icon: string;
}
