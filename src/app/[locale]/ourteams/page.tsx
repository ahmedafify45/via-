"use client";

import Banner from "@/components/custom/banner";
import TeamCard from "@/components/team/TeamCard";
import { useFetch } from "@/hooks/useFetch";
import { TeamMember } from "@/types/team";

interface ApiResponse {
  data: TeamMember[];
  public: boolean;
}

function OurTeams() {
  const {
    data: response,
    loading,
    error,
  } = useFetch<ApiResponse>("/items/team_members");

  if (loading) {
    return (
      <main className="my-[150px] mx-[80px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </main>
    );
  }

  if (error || !response?.data) {
    return (
      <main className="my-[150px] mx-[80px] text-center text-primary">
        Failed to load team members
      </main>
    );
  }

  return (
    <main className="my-[150px] mx-[80px]">
      <Banner title="Our Teams" subtitle="Home / Our Teams" />
      <TeamCard team={response.data} locale="en" />
    </main>
  );
}

export default OurTeams;
