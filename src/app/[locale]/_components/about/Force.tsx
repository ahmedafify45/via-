"use client";

import TeamCard from "@/components/team/TeamCard";
import { TeamMember } from "@/types/team";
import { useFetch } from "@/hooks/useFetch";
import { Languages } from "@/constants/enums";

interface ApiResponse {
  data: TeamMember[];
  public: boolean;
}

interface PageSettings {
  title: string;
  title_en: string;
  seo_meta?: {
    title: string;
    description: string;
  };
  seo_meta_en?: {
    title: string;
    description: string;
  };
}

interface PageSettingsResponse {
  data: PageSettings[];
  public: boolean;
}

interface ForceProps {
  locale: string;
}

function Force({ locale }: ForceProps) {
  const isEnglish = locale === Languages.ENGLISH;

  const {
    data: teamResponse,
    loading: teamLoading,
    error: teamError,
  } = useFetch<ApiResponse>("/items/team_members", {
    fields: "*.*",
  });

  const {
    data: pageSettingsResponse,
    loading: settingsLoading,
    error: settingsError,
  } = useFetch<PageSettingsResponse>("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "team-members",
  });

  if (teamLoading || settingsLoading) {
    return (
      <div className="mx-[80px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (teamError || settingsError) {
    console.error("Error loading data:", teamError || settingsError);
    return (
      <div className="mx-[80px] text-center text-red-500">
        Failed to load data. Please try again later.
      </div>
    );
  }

  if (!teamResponse?.data) {
    console.error("No team members data received");
    return (
      <div className="mx-[80px] text-center text-red-500">
        No team members data available.
      </div>
    );
  }

  const pageTitle = pageSettingsResponse?.data?.[0]
    ? isEnglish
      ? pageSettingsResponse.data[0].title_en
      : pageSettingsResponse.data[0].title
    : isEnglish
    ? "Team Work"
    : "فريق العمل";

  return (
    <div className="mx-4 xl:mx-[80px]">
      <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[24px] md:text-[32px] lg:text-[48px] font-bold text-primary max-w-[1006px]">
          {pageTitle}
        </h4>
        {pageSettingsResponse?.data?.[0] && (
          <p className="text-white text-[20px] font-medium my-4 max-w-[800px]">
            {isEnglish
              ? pageSettingsResponse.data[0].seo_meta_en?.description
              : pageSettingsResponse.data[0].seo_meta?.description}
          </p>
        )}
      </div>
      <TeamCard team={teamResponse.data} locale={locale} />
    </div>
  );
}

export default Force;
