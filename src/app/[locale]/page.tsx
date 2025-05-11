import AboutUs from "./_components/AboutUs";
import Hero from "./_components/Hero";
import OurClients from "./_components/OurClients";
import OurPortfolio from "./_components/OurPortfolio";
import OurService from "./_components/OurService";
import Image from "next/image";
import { generateStaticParams } from "@/lib/generateStaticParams";

import BookingForm from "@/components/booking/BookingForm";
import CallToAction from "./_components/CallToAction";
import { Languages } from "@/constants/enums";
import { serverFetcher } from "@/lib/serverFetcher";
import { Metadata } from "next";

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
      siteName: "Via",
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
      <div className="mt-[50px] xl:flex justify-center items-center">
        <OurClients />
      </div>

      <div className="flex flex-col items-center mx-[20px] sm:mx-[40px] md:mx-[60px] lg:mx-[80px]">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
          <div className="ybg-[#17181C] border border-[#25231B] rounded-[2px] order-2 lg:order-1">
            <BookingForm />
          </div>
          <div className="w-full sm:w-[90%] xl:w-auto order-1 lg:order-2 flex items-center justify-center lg:block">
            <Image
              src="/images/booking.png"
              alt=""
              width={350}
              height={500}
              className="w-[350px] h-[500px] xl:w-[450px] xl:h-[600px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
