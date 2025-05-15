export interface ErrorPageData {
  id: number;
  title: string;
  title_en: string;
  seo_meta: {
    title: string; // "صفحة الايرور"
    description: string; // "دا الدسكربشن بتاع الايرور باج"
  };
  seo_meta_en: {
    title: string; // "error page"
    description: string; // "description error page"
  };
  banner: { data: { full_url: string } };
  options: {
    sub_title: string;
    title: string;
    button_text: string;
    sub_title_en: string;
    title_en: string;
    button_text_en: string;
  };
  slug: string;
}

export interface ErrorPageResponse {
  data: ErrorPageData[];
  public: boolean;
}
