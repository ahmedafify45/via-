import AboutsSection from "@/components/about/AboutsSection";
import { generateStaticParams } from "@/lib/generateStaticParams";
import { Metadata } from "next";
import { serverFetcher } from "@/lib/serverFetcher";
import { Languages } from "@/constants/enums";

export { generateStaticParams };

interface AboutSection {
  data: Array<{
    id: number;
    title: string;
    title_en: string;
    seo_meta: {
      title: string;
      description: string;
      keywords: string;
    };
    seo_meta_en: {
      title: string;
      description: string;
      keywords: string;
    };
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const aboutSection = await serverFetcher<AboutSection>(
    "/items/about_section"
  );

  const seoData =
    locale === Languages.ARABIC
      ? aboutSection.data[0]?.seo_meta
      : aboutSection.data[0]?.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC
      ? aboutSection.data[0]?.title
      : aboutSection.data[0]?.title_en);

  const description = seoData?.description || "";
  const keywords = seoData?.keywords || "";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: "/about-us",
      siteName: title,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function AboutUs() {
  return (
    <main>
      <AboutsSection />
    </main>
  );
}

export default AboutUs;
