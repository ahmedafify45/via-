"use client";
import TeamCard from "@/components/team/TeamCard";
import { useFetch } from "@/hooks/useFetch";

import { TeamMember } from "@/types/team";
import Link from "next/link";

interface ApiResponse {
  data: TeamMember[];
  public: boolean;
}

interface HomePageSetting {
  id: number;
  sort: number;
  title: string;
  sub_title: string;
  how_many: number;
  is_active: boolean;
  title_en: string;
  sub_title_en: string;
  button_text: string;
  button_text_en: string;
  button_url: string;
  button_url_en: string;
  slug: string;
}

interface HomePageSettingResponse {
  data: HomePageSetting[];
}

function TeammemberSection({ locale }: { locale: string }) {
  const { data: response } = useFetch<ApiResponse>("/items/team_members", {
    fields: "*.*",
  });

  const { data: settingsResponse } = useFetch<HomePageSettingResponse>(
    "/items/home_page_setting?filter[slug]=team-area-section"
  );

  const settings = settingsResponse?.data?.[0];
  const isActive = settings?.is_active ?? true;
  const howMany = settings?.how_many ?? 8;

  if (!isActive) return null;

  const title = locale === "en" ? settings?.title_en : settings?.title;
  const subTitle =
    locale === "en" ? settings?.sub_title_en : settings?.sub_title;
  const buttonText =
    locale === "en" ? settings?.button_text_en : settings?.button_text;
  const buttonUrl =
    locale === "en" ? settings?.button_url_en : settings?.button_url;

  return (
    <section className="xl:mx-[80px] mx-4 mt-[100px] flex items-center justify-center xl:block">
      <div>
        <div className="text-center">
          <p className="xl:text-[48px] font-bold text-primary text-[20px]">
            {title}
          </p>
          <p className="text-white text-[20px] font-medium mb-4">{subTitle}</p>
        </div>
        {response?.data && (
          <TeamCard team={response.data.slice(0, howMany)} locale={locale} />
        )}
        {buttonText && buttonUrl && (
          <div className="flex justify-center">
            <Link
              href={buttonUrl}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default TeammemberSection;
