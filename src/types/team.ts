export interface TeamMember {
  id: number;
  status: string;
  sort: number | null;
  owner: number;
  created_on: string;
  modified_by: number;
  modified_on: string;
  name: string;
  name_en: string;
  designation: string;
  designation_en: string;
  avatar: { data: { full_url: string } };
  phone: string;
  tagline: string;
  tagline_en: string;
  email: string;
  website: string;
  social_media?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    pinterest?: string;
    behance?: string;
    github?: string;
  };
  seo_meta?: {
    title: string;
    description: string;
  };
  seo_meta_en?: {
    title: string;
    description: string;
  };
}
