import AboutUs from "./_components/AboutUs";
import Hero from "./_components/Hero";
import OurClients from "./_components/OurClients";
import OurPortfolio from "./_components/OurPortfolio";
import OurService from "./_components/OurService";
import { generateStaticParams } from "@/lib/generateStaticParams";

import BookingForm from "@/components/booking/BookingForm";
import CallToAction from "./_components/CallToAction";
import { Languages } from "@/constants/enums";
import { serverFetcher } from "@/lib/serverFetcher";
import { Metadata } from "next";
import TeammemberSection from "./_components/TeammemberSection";
import BlogHome from "./_components/BlogHome";

export { generateStaticParams };

interface ApiResponse {
  data: Array<{
    title: string;
    title_en: string;
    seo_meta?: {
      title: string;
      description: string;
      keywords: string;
    };
    seo_meta_en?: {
      title: string;
      description: string;
      keywords: string;
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const pageSettings = await serverFetcher<ApiResponse>(
    "/items/general_settings",
    {
      fields: "*.*",
    }
  );

  const seoData =
    locale === Languages.ARABIC
      ? pageSettings.data[0]?.seo_meta
      : pageSettings.data[0]?.seo_meta_en;

  const title =
    seoData?.title ||
    (locale === Languages.ARABIC
      ? pageSettings.data[0]?.title
      : pageSettings.data[0]?.title_en);

  const description = seoData?.description;
  const keywords = seoData?.keywords;

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `/`,
      siteName: title,
      images: [
        {
          url: pageSettings.data[0]?.banner?.data?.full_url || "",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [pageSettings.data[0]?.banner?.data?.full_url || ""],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const resolvedParams = await params;

  if (
    resolvedParams.locale === "favicon.ico" ||
    resolvedParams.locale === "placeholder-image.jpg"
  ) {
    return null;
  }

  return (
    <main className="my-[220px] overflow-x-hidden">
      <Hero />
      <AboutUs />
      <OurPortfolio params={resolvedParams} />
      <CallToAction />
      <OurService />
      <TeammemberSection locale={resolvedParams.locale} />
      <BlogHome locale={resolvedParams.locale} />
      <div className="mt-[50px] xl:flex justify-center items-center">
        <OurClients />
      </div>

      <div className="flex flex-col items-center px-[2px] xl:mx-[80px]">
        <div className="w-full">
          <div className="bg-[#17181C] border border-[#25231B] rounded-[2px]">
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}
