export interface HeroItem {
  id: number;
  sort: number;
  banner: { data: { full_url: string } };
  image: { data: { full_url: string } };
  title: string;
  sub_title: string;
  button_text: string;
  button_url: string;
  text: string;
  title_en: string;
  sub_title_en: string;
  button_text_en: string;
  button_url_en: string;
  text_en: string;
}
