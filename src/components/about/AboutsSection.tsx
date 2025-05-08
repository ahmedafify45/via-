"use client";

import Force from "@/app/[locale]/_components/about/Force";
import OurMission from "@/app/[locale]/_components/about/OurMission";
import OurStory from "@/app/[locale]/_components/about/OurStory";
import OurVision from "@/app/[locale]/_components/about/OurVision";
import WhatChoose from "@/app/[locale]/_components/about/WhatChoose";
import OurClients from "@/app/[locale]/_components/OurClients";
import { useParams } from "next/navigation";

function AboutsSection() {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <section className="my-[220px] overflow-hidden">
      <OurStory />
      <OurMission />
      <OurVision />
      <WhatChoose />
      <Force locale={locale} />
      <div className="lg:flex items-center justify-center mt-[50px] md:mt-[100px]">
        <OurClients />
      </div>
    </section>
  );
}

export default AboutsSection;
