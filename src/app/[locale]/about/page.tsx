import AboutsSection from "@/components/about/AboutsSection";
import React from "react";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

function AboutUs() {
  return (
    <main>
      <AboutsSection />
    </main>
  );
}

export default AboutUs;
