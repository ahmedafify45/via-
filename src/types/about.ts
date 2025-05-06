export interface AboutStory {
  id: number;
  title: string;
  title_en: string;
  sub_title: string;
  sub_title_en: string;
  text: string;
  text_en: string;
  image: { data: { full_url: string } };
}

export interface AboutStoryResponse {
  data: AboutStory[];
  public: boolean;
}

export interface MissionAndVision {
  id: number;
  title: string;
  title_en: string;
  text: string;
  text_en: string;
  image: { data: { full_url: string } };
  image2: { data: { full_url: string } };
}

export interface MissionAndVisionResponse {
  data: MissionAndVision[];
  public: boolean;
}

export interface CoreValue {
  id: number;
  sort: number | null;
  title: string;
  title_en: string;
  text: string;
  text_en: string;
  icon: string;
}

export interface CoreValueResponse {
  data: CoreValue[];
  public: boolean;
}
