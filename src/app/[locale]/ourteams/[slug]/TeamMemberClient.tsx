"use client";
import { TeamMember } from "@/types/team";
import {
  faYoutube,
  faInstagram,
  faTwitter,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Languages } from "@/constants/enums";
import { useFetch } from "@/hooks/useFetch";
import Loading from "@/components/Loading";

type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

export default function TeamMemberClient(props: PageProps) {
  const { params } = props;
  const isEnglish = params.locale === Languages.ENGLISH;
  const {
    data: response,
    loading,
    error,
  } = useFetch<{ data: TeamMember }>(`/items/team_members/${params.slug}`, {
    fields: "*.*",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Error</h2>
          <p>Failed to load team member details. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!response?.data) {
    notFound();
  }

  const member = response.data;

  const socialMediaLinks = [
    {
      icon: faFacebookF,
      url: member.social_media?.facebook,
      label: "Facebook",
    },
    {
      icon: faInstagram,
      url: member.social_media?.instagram,
      label: "Instagram",
    },
    {
      icon: faTwitter,
      url: member.social_media?.twitter,
      label: "Twitter",
    },
    {
      icon: faYoutube,
      url: member.social_media?.youtube,
      label: "YouTube",
    },
  ];

  return (
    <main className="mx-4 md:mx-[80px] my-[80px] md:my-[150px]">
      <div>
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px] bg-[#17181C] py-[16px] px-4 md:px-0">
          <div className="">
            <Image
              src={member.avatar?.data?.full_url}
              alt={isEnglish ? member.name_en : member.name}
              width={200}
              height={100}
              className="w-full object-cover"
            />
          </div>
          <div className="text-white flex flex-col gap-[12px] md:gap-[16px]">
            <h1 className="text-[28px] xl:text-[38px] font-bold">
              {isEnglish ? member.name_en : member.name}
            </h1>
            <p className="text-primary text-[16px] xl:text-[20px] font-bold">
              {isEnglish ? member.designation_en : member.designation}
            </p>
            <p className="text-[16px] xl:text-[20px] font-medium">
              {isEnglish ? member.tagline_en : member.tagline}
            </p>
            <p className="text-[16px] xl:text-[20px] font-medium">
              Email: {member.email}
            </p>
            <p className="text-[16px] xl:text-[20px] font-medium">
              Phone: {member.phone}
            </p>
            {member.website && (
              <p className="text-[16px] xl:text-[20px] font-medium">
                Website:{" "}
                <Link
                  href={member.website}
                  target="_blank"
                  className="text-primary hover:underline"
                >
                  {member.website}
                </Link>
              </p>
            )}
            {member.social_media && (
              <div className="flex items-center gap-[12px] md:gap-[16px]">
                {socialMediaLinks.map(
                  (social) =>
                    social.url && (
                      <Link
                        key={social.label}
                        target="_blank"
                        href={social.url}
                        className="bg-[#787878] text-white py-[4px] px-[2px] w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
                        aria-label={social.label}
                      >
                        <FontAwesomeIcon
                          icon={social.icon}
                          className="w-[12px] h-[10px] md:w-[14px] md:h-[12px]"
                        />
                      </Link>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-[60px] md:mt-[140px] px-4 md:px-0">
        <h2 className="text-[32px] xl:text-[48px] font-bold text-primary">
          Personal Experience
        </h2>
        <p className="text-[16px] xl:text-[20px] font-medium text-[#FFFFFF] mt-4">
          {isEnglish ? member.tagline_en : member.tagline}
        </p>
      </div>
    </main>
  );
}
