import Services from "@/components/services";
import React from "react";
import { generateStaticParams } from "@/lib/generateStaticParams";
import { Metadata } from "next";
import { Languages } from "@/constants/enums";
import { serverFetcher } from "@/lib/serverFetcher";

export { generateStaticParams };

interface ApiResponse {
  data: Array<{
    id: number;
    title: string;
    title_en: string;
    seo_meta?: {
      title: string;
      description: string;
    };
    seo_meta_en?: {
      title: string;
      description: string;
    };
    banner?: {
      data?: {
        full_url: string;
      };
    };
  }>;
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const pageSettings = await serverFetcher<ApiResponse>("/items/other_pages", {
    fields: "*.*",
    "filter[slug]": "services",
  });

  const seoData =
    locale === Languages.ARABIC
      ? pageSettings.data[0]?.seo_meta
      : pageSettings.data[0]?.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC
      ? pageSettings.data[0]?.title
      : pageSettings.data[0]?.title_en);

  const description =
    seoData?.description || "Explore our professional services and solutions";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `/services`,
      siteName: "My Website",
      images: [
        {
          url: pageSettings.data[0]?.banner?.data?.full_url || "",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}

function ServicesPage() {
  return (
    <main>
      <Services />
    </main>
  );
}

export default ServicesPage;
