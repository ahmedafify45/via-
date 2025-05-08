import Services from "@/components/services";
import React from "react";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

function ServicesPage() {
  return (
    <main>
      <Services />
    </main>
  );
}

export default ServicesPage;
