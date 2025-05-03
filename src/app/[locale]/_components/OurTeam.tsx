"use client";

import { TeamMember } from "@/types/team";
import Image from "next/image";

interface OurTeamProps {
  teamMembers: TeamMember[];
}

export default function OurTeam({ teamMembers }: OurTeamProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <Image
                src={member.avatar?.data?.full_url}
                alt={member.name}
                width={360}
                height={360}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.designation}</p>
              <p className="text-gray-500 text-sm">{member.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
