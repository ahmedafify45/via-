import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TeamMember {
  id: number;
  slug: string;
  image: string;
  name: string;
  job: string;
}

function TeamCard({ team }: { team: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {team.map((item) => (
        <Link
          href={`/team/${item.slug}`}
          key={item.slug}
          className="flex flex-col items-center justify-center gap-1 mt-3 hover:opacity-80 transition-opacity"
        >
          <div>
            <Image
              src={item.image}
              alt={item.name}
              width={360}
              height={360}
              className="rounded-[8px]"
            />
          </div>
          <h5 className="text-[#D6D6D6] text-[24px] font-bold">{item.name}</h5>
          <p className="text-[#D6D6D6] text-[20px] font-medium">{item.job}</p>
        </Link>
      ))}
    </div>
  );
}

export default TeamCard;
