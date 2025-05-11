import TeamCard from "@/components/team/TeamCard";
import { TeamMember } from "@/types/team";
import { serverFetcher } from "@/lib/serverFetcher";
import { generateStaticParams } from "@/lib/generateStaticParams";
import Banner from "@/components/custom/banner";
import { Metadata } from "next";
import { Languages } from "@/constants/enums";

export { generateStaticParams };

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
  banner: {
    data: {
      full_url: string;
    };
  };
}

interface PageSettingsResponse {
  data: PageSettings[];
  public: boolean;
}

interface ApiResponse {
  data: TeamMember[];
  public: boolean;
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageSettings = await serverFetcher<PageSettingsResponse>(
    "/items/other_pages",
    {
      fields: "*.*",
      "filter[slug]": "team-members",
    }
  );

  const seoData =
    locale === Languages.ARABIC
      ? pageSettings.data[0]?.seo_meta
      : pageSettings.data[0]?.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC
      ? pageSettings.data[0]?.title
      : pageSettings.data[0]?.title_en);

  const description = seoData?.description;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `/ourteams`,
      siteName: "Via",
      images: [
        {
          url: pageSettings.data[0]?.banner?.data?.full_url || "",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [pageSettings.data[0]?.banner?.data?.full_url || ""],
    },
  };
}

export default async function OurTeams({ params }: PageProps) {
  const { locale } = await params;

  try {
    const response = await serverFetcher<ApiResponse>("/items/team_members", {
      fields: "*.*",
    });

    if (!response?.data) {
      throw new Error("No team members data available");
    }

    const pageSettingsResponse = await serverFetcher<PageSettingsResponse>(
      "/items/other_pages",
      {
        fields: "*.*",
        "filter[slug]": "team-members",
      }
    );

    return (
      <main className="my-[150px] xl:mx-[80px] mx-4">
        <Banner
          pageSettings={pageSettingsResponse?.data || []}
          locale={locale}
        />
        <TeamCard team={response.data} locale={locale} />
      </main>
    );
  } catch (error) {
    console.error("Error loading team members:", error);
    return (
      <main className="my-[150px] xl:mx-[80px] mx-4 text-center">
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
