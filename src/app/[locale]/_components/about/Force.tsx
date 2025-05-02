"use client";

import TeamCard from "@/components/team/TeamCard";
import { TeamMember } from "@/types/team";
import { useFetch } from "@/hooks/useFetch";

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
  } = useFetch<ApiResponse>("/items/team_members");

  if (loading) {
    return (
      <div className="mx-[80px] mb-[80px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !response?.data) {
    return (
      <div className="mx-[80px] mb-[80px] text-center text-red-500">
        Failed to load team members
      </div>
    );
  }

  return (
    <div className="mx-[80px] mb-[80px]">
      <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[24px] md:text-[32px] lg:text-[48px] font-bold text-primary max-w-[1006px]">
          The Force Behind
          <br />
          Marketing Success
        </h4>
        <p className="text-[#FFFFFF] max-w-[1006px] text-[14px] md:text-[18px] lg:text-[24px] font-medium px-2 md:px-4 lg:px-0 mt-2 mb-[16px]">
          Transform the way you work effortlessly track and complete tasks.
          Simplify your workflow, boost your productivity, and achieve more.
        </p>
      </div>
      <TeamCard team={response.data} locale={locale} />
    </div>
  );
}

export default Force;
