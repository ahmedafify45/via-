import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { serverFetcher } from "@/lib/serverFetcher";
import { Languages } from "@/constants/enums";
import { redirect } from "next/navigation";
import { i18n } from "@/i18n.config";
import { generateTeamMemberParams } from "@/lib/generateTeamMemberParams";
import Banner from "@/components/custom/banner";
import { Metadata } from "next";

interface TeamMember {
  id: number;
  name: string;
  name_en: string;
  designation: string;
  designation_en: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  avatar?: {
    id: string;
    data: {
      full_url: string;
    };
  };
  seo_meta?: {
    title: string;
    description: string;
  };
  seo_meta_en?: {
    title: string;
    description: string;
  };
}

interface PageProps {
  params: Promise<{
    locale: Languages | string;
    slug: string;
  }>;
}

interface PageSettings {
  title: string;
  title_en: string;
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

export const generateStaticParams = generateTeamMemberParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const response = await serverFetcher<{ data: TeamMember }>(
    `/items/team_members/${slug}`,
    {
      fields: "*.*",
    }
  );

  const member = response.data;
  if (!member) {
    return {
      title: "Team Member Not Found",
      description: "The requested team member could not be found.",
    };
  }

  const seoData =
    locale === Languages.ARABIC ? member.seo_meta : member.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC ? member.name : member.name_en);

  const description =
    seoData?.description ||
    (locale === Languages.ARABIC ? member.designation : member.designation_en);

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/ourteams/${slug}`,
      siteName: title,
      images: member.avatar?.data?.full_url
        ? [
            {
              url: member.avatar.data.full_url,
              width: 400,
              height: 400,
              alt: title,
            },
          ]
        : [],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: member.avatar?.data?.full_url
        ? [member.avatar.data.full_url]
        : [],
    },
    alternates: {
      canonical: `/ourteams/${slug}`,
      languages: {
        ar: `/ar/ourteams/${slug}`,
        en: `/en/ourteams/${slug}`,
      },
    },
  };

  return metadata;
}

export default async function TeamMemberPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  // Handle undefined locale by redirecting to Arabic
  if (!locale || locale === "undefined") {
    redirect(`/${Languages.ARABIC}/ourteams/${slug}`);
  }

  // Handle invalid locale by redirecting to Arabic
  if (!i18n.locales.includes(locale as Languages)) {
    redirect(`/${Languages.ARABIC}/ourteams/${slug}`);
  }

  // Handle invalid or undefined slug
  if (!slug || slug === "undefined") {
    redirect(`/${locale}/ourteams`);
  }

  try {
    const [response, pageSettingsResponse] = await Promise.all([
      serverFetcher<{ data: TeamMember }>(`/items/team_members/${slug}`, {
        fields: "*.*",
      }),
      serverFetcher<PageSettingsResponse>("/items/other_pages", {
        fields: "*.*",
        "filter[slug]": "team-members",
      }),
    ]);

    if (!response.data) {
      redirect(`/${locale}/ourteams`);
    }

    const member = response.data;

    return (
      <main className="mx-4 md:mx-[80px] my-[80px] md:my-[150px]">
        <Banner
          pageSettings={pageSettingsResponse?.data || []}
          locale={locale}
        />
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px] bg-[#17181C] py-[16px] px-4 md:px-0">
          <div className="md:w-1/3">
            <Image
              src={member.avatar?.data?.full_url || "/images/placeholder.png"}
              alt={member.name}
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3 text-white flex flex-col gap-[16px] md:gap-[24px]">
            <h1 className="text-[32px] xl:text-[48px] font-bold">
              {locale === "en" ? member.name_en : member.name}
            </h1>
            <p className="text-primary text-[20px] xl:text-[24px] font-bold">
              {locale === "en" ? member.designation_en : member.designation}
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[16px] xl:text-[18px]">
                  <span className="text-primary">Email:</span> {member.email}
                </p>
                <p className="text-[16px] xl:text-[18px]">
                  <span className="text-primary">Phone:</span> {member.phone}
                </p>
                {member.website && (
                  <p className="text-[16px] xl:text-[18px]">
                    <span className="text-primary">Website:</span>{" "}
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {member.website}
                    </a>
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching team member:", error);
    redirect(`/${locale}/ourteams`);
  }
}
