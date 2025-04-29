import Banner from "@/components/custom/banner";
import TeamCard from "@/components/team/TeamCard";
import React from "react";
import { team } from "../_components/about/Force";

function OurTeams() {
  return (
    <main className="my-[150px] mx-[80px]">
      <Banner title="Our Teams" subtitle="Home / Our Teams" />
      <TeamCard team={team} />
    </main>
  );
}

export default OurTeams;
