import FaqSection from "@/components/faq";
import React from "react";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

function page() {
  return (
    <main>
      <FaqSection />
    </main>
  );
}

export default page;
