export interface ApiResponse {
  data: Array<{
    title?: string;
    title_en?: string;
    seo_meta?: {
      title: string;
      description: string;
    };
    seo_meta_en?: {
      title: string;
      description: string;
    };
    banner?: {
      data: {
        full_url: string;
      };
    };
  }>;
}
