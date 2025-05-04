import { Languages } from "@/constants/enums";
import { TeamMember } from "@/types/team";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TeamCardProps {
  team: TeamMember[];
  locale: string;
}

function TeamCard({ team, locale }: TeamCardProps) {
  const isEnglish = locale === Languages.ENGLISH;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {team.map((item) => (
        <Link
          href={`/${locale}/ourteams/${item.id}`}
          key={item.id}
          className="flex flex-col items-center justify-center gap-1 mt-3 hover:opacity-80 transition-opacity"
        >
          <div>
            <Image
              src={item.avatar?.data?.full_url}
              alt={isEnglish ? item.name_en : item.name}
              width={360}
              height={360}
              className="rounded-[8px]"
            />
          </div>
          <h5 className="text-[#D6D6D6] text-[24px] font-bold">
            {isEnglish ? item.name_en : item.name}
          </h5>
          <p className="text-[#D6D6D6] text-[20px] font-medium">
            {isEnglish ? item.designation_en : item.designation}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default TeamCard;
