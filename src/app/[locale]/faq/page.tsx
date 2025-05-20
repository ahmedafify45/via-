import FaqSection from "@/components/faq";
import React from "react";
import { generateStaticParams } from "@/lib/generateStaticParams";

export { generateStaticParams };

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function Page(props: PageProps) {
  const params = await props.params;
  const { locale } = params;

  return (
    <main>
      <FaqSection locale={locale} />
    </main>
  );
}
export default Page;
