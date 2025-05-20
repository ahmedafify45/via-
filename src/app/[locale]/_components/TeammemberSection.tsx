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
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {title}
          </h2>
          <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto">
            {subTitle}
          </p>
        </div>

        {response?.data && (
          <div className="w-full">
            <TeamCard team={response.data.slice(0, howMany)} locale={locale} />
          </div>
        )}

        {buttonText && buttonUrl && (
          <div className="flex justify-center mt-12">
            <Link
              href={buttonUrl}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium"
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
