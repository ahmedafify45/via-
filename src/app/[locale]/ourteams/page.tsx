"use client";

import Banner from "@/components/custom/banner";
import TeamCard from "@/components/team/TeamCard";
import { useFetch } from "@/hooks/useFetch";
import { TeamMember } from "@/types/team";
import Loading from "@/components/Loading";

interface ApiResponse {
  data: TeamMember[];
  public: boolean;
}

function OurTeams({ params }: { params: { locale: string } }) {
  const {
    data: response,
    loading,
    error,
  } = useFetch<ApiResponse>("/items/team_members", {
    fields: "*.*",
  });

  if (loading) {
    return (
      <main className="my-[150px] mx-[80px] flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  if (error) {
    console.error("Error loading team members:", error);
    return (
      <main className="my-[150px] mx-[80px] text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Error</h2>
        <p className="text-white">
          Failed to load team members. Please try again later.
        </p>
        <p className="text-sm text-gray-400 mt-2">Error: {error.message}</p>
      </main>
    );
  }

  if (!response?.data) {
    console.error("No team members data received");
    return (
      <main className="my-[150px] mx-[80px] text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Error</h2>
        <p className="text-white">No team members data available.</p>
      </main>
    );
  }

  return (
    <main className="my-[150px] mx-[80px]">
      <Banner title="Our Teams" subtitle="Home / Our Teams" />
      <TeamCard team={response.data} locale={params.locale} />
    </main>
  );
}

export default OurTeams;
