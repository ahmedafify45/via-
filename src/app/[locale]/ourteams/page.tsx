import TeamCard from "@/components/team/TeamCard";
import { TeamMember } from "@/types/team";
import { serverFetcher } from "@/lib/serverFetcher";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

interface ApiResponse {
  data: TeamMember[];
  public: boolean;
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function OurTeams(props: PageProps) {
  const params = await props.params;
  const { locale } = params;

  try {
    const response = await serverFetcher<ApiResponse>("/items/team_members", {
      fields: "*.*",
    });

    if (!response?.data) {
      throw new Error("No team members data available");
    }

    return (
      <main className="my-[150px] mx-[80px]">
        <TeamCard team={response.data} locale={locale} />
      </main>
    );
  } catch (error) {
    console.error("Error loading team members:", error);
    return (
      <main className="my-[150px] mx-[80px] text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Error</h2>
        <p className="text-white">
          Failed to load team members. Please try again later.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </main>
    );
  }
}
