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

export const generateStaticParams = generateTeamMemberParams;

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  avatar?: {
    id: string;
  };
}

interface PageProps {
  params: Promise<{
    locale: Languages | string;
    slug: string;
  }>;
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
    const response = await serverFetcher<{ data: TeamMember }>(
      `/items/team_members/${slug}`,
      {
        fields: "*.*",
      }
    );

    if (!response.data) {
      redirect(`/${locale}/ourteams`);
    }

    const member = response.data;

    return (
      <main className="mx-4 md:mx-[80px] my-[80px] md:my-[150px]">
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px] bg-[#17181C] py-[16px] px-4 md:px-0">
          <div className="md:w-1/3">
            <Image
              src={
                member.avatar
                  ? `/assets/${member.avatar.id}`
                  : "/images/placeholder.png"
              }
              alt={member.name}
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3 text-white flex flex-col gap-[16px] md:gap-[24px]">
            <h1 className="text-[32px] xl:text-[48px] font-bold">
              {member.name}
            </h1>
            <p className="text-primary text-[20px] xl:text-[24px] font-bold">
              {member.designation}
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
