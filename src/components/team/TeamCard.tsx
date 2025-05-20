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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {team.map((item) => (
        <Link
          href={`/${locale}/ourteams/${item.id}`}
          key={item.id}
          className="group flex flex-col items-center bg-[#1A1A1A] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="relative w-full aspect-square max-w-[280px] overflow-hidden rounded-lg">
            <Image
              src={item.avatar?.data?.full_url}
              alt={isEnglish ? item.name_en : item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="text-center mt-6">
            <h5 className="text-[#D6D6D6] text-xl md:text-2xl font-bold mb-2">
              {isEnglish ? item.name_en : item.name}
            </h5>
            <p className="text-[#D6D6D6] text-base md:text-lg font-medium">
              {isEnglish ? item.designation_en : item.designation}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TeamCard;
