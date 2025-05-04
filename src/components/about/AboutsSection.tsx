import Force from "@/app/[locale]/_components/about/Force";
import OurMission from "@/app/[locale]/_components/about/OurMission";
import OurStory from "@/app/[locale]/_components/about/OurStory";
import OurVision from "@/app/[locale]/_components/about/OurVision";
import WhatChoose from "@/app/[locale]/_components/about/WhatChoose";
import OurClients from "@/app/[locale]/_components/OurClients";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

async function AboutsSection() {
  const locale = await getCurrentLocale();

  return (
    <section className="my-[220px] overflow-hidden">
      <OurStory />
      <OurMission />
      <OurVision />
      <WhatChoose />
      <Force locale={locale} />
      <div className="flex items-center justify-center">
        <OurClients />
      </div>
    </section>
  );
}

export default AboutsSection;
