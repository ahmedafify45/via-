import Force from "@/app/_components/about/Force";
import OurMission from "@/app/_components/about/OurMission";
import OurStory from "@/app/_components/about/OurStory";
import OurVision from "@/app/_components/about/OurVision";
import WhatChoose from "@/app/_components/about/WhatChoose";
import OurClients from "@/app/_components/OurClients";

function AboutsSection() {
  return (
    <section className="mt-[150px]">
      <OurStory />
      <OurMission />
      <OurVision />
      <WhatChoose />
      <Force />
      <OurClients />
    </section>
  );
}

export default AboutsSection;
