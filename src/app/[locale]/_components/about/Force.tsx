"use client";

import TeamCard from "@/components/team/TeamCard";
import { TeamMember } from "@/types/team";
import { useFetch } from "@/hooks/useFetch";
import { Languages } from "@/constants/enums";

interface ApiResponse {
  data: TeamMember[];
  public: boolean;
}

interface ForceProps {
  locale: string;
}

function Force({ locale }: ForceProps) {
  const {
    data: response,
    loading,
    error,
  } = useFetch<ApiResponse>("/items/team_members", {
    fields: "*.*",
  });

  if (loading) {
    return (
      <div className="mx-[80px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    console.error("Error loading team members:", error);
    return (
      <div className="mx-[80px] text-center text-red-500">
        Failed to load team members. Please try again later.
      </div>
    );
  }

  if (!response?.data) {
    console.error("No team members data received");
    return (
      <div className="mx-[80px] text-center text-red-500">
        No team members data available.
      </div>
    );
  }

  return (
    <div className="mx-4 xl:mx-[80px]">
      <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[24px] md:text-[32px] lg:text-[48px] font-bold text-primary max-w-[1006px]">
          {locale === Languages.ARABIC ? "فريق العمل" : "team work"}
        </h4>
      </div>
      <TeamCard team={response.data} locale={locale} />
    </div>
  );
}

export default Force;
