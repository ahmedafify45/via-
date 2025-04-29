import Force from "@/app/[locale]/_components/about/Force";
import OurMission from "@/app/[locale]/_components/about/OurMission";
import OurStory from "@/app/[locale]/_components/about/OurStory";
import OurVision from "@/app/[locale]/_components/about/OurVision";
import WhatChoose from "@/app/[locale]/_components/about/WhatChoose";
import OurClients from "@/app/[locale]/_components/OurClients";

function AboutsSection() {
  return (
    <section className="my-[220px]">
      <OurStory />
      <OurMission />
      <OurVision />
      <WhatChoose />
      <Force />
      <div className="flex items-center justify-center">
        <OurClients />
      </div>
    </section>
  );
}

export default AboutsSection;
