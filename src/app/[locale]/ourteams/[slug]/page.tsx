"use client";

import { TeamMember } from "@/types/team";
import Banner from "@/components/custom/banner";
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
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function TeamMemberPage({ params }: PageProps) {
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
        <Banner title="Our Teams" subtitle="Home / Our Teams / Team Details" />
        <div className="flex flex-col md:flex-row gap-[24px] md:gap-[48px] bg-[#17181C] py-[16px] px-4 md:px-0">
          <div className="w-full md:w-auto">
            <Image
              src={member.avatar?.data?.full_url}
              alt={isEnglish ? member.name_en : member.name}
              width={450}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="text-white flex flex-col gap-[12px] md:gap-[16px]">
            <h1 className="text-[28px] md:text-[38px] font-bold">
              {isEnglish ? member.name_en : member.name}
            </h1>
            <p className="text-primary text-[16px] md:text-[20px] font-bold">
              {isEnglish ? member.designation_en : member.designation}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium">
              {isEnglish ? member.tagline_en : member.tagline}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium">
              Email: {member.email}
            </p>
            <p className="text-[16px] md:text-[20px] font-medium">
              Phone: {member.phone}
            </p>
            {member.website && (
              <p className="text-[16px] md:text-[20px] font-medium">
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
        <h2 className="text-[32px] md:text-[48px] font-bold text-primary">
          Personal Experience
        </h2>
        <p className="text-[16px] md:text-[20px] font-medium text-[#FFFFFF] mt-4">
          {isEnglish ? member.tagline_en : member.tagline}
        </p>
      </div>
    </main>
  );
}
{
  /* <div className="container mx-auto px-4 py-12">
<div className="max-w-4xl mx-auto">
  <div className="flex flex-col md:flex-row gap-8 items-start">
    <div className="w-full md:w-1/3">
      <Image
        src={member.image}
        alt={member.name}
        width={400}
        height={400}
        className="rounded-lg w-full"
      />
    </div>
    <div className="w-full md:w-2/3">
      <h1 className="text-4xl font-bold text-primary mb-4">
        {member.name}
      </h1>
      <h2 className="text-2xl text-[#D6D6D6] mb-6">{member.job}</h2>
      <div className="prose prose-invert max-w-none">
        <p className="text-lg text-[#D6D6D6]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-lg text-[#D6D6D6] mt-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </div>
    </div>
  </div>
</div>
</div> */
}
