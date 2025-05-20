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
      title_en: string;
      description_en: string;
      keywords_en: string;
      meta_image: string;
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
  try {
    const { locale } = await params;
    const pageSettings = await serverFetcher<ApiResponse>(
      "/items/general_settings",
      {
        fields: "*.*",
      }
    );

    // Validate the response structure
    if (!pageSettings?.data?.[0]) {
      console.error("Invalid page settings response:", pageSettings);
      return {
        title: "VIA",
        description: "",
      };
    }

    const seoData = pageSettings.data[0]?.seo_meta;

    // Ensure we have valid strings for all fields
    const title =
      locale === Languages.ARABIC
        ? String(seoData?.title || pageSettings.data[0]?.title || "VIA")
        : String(seoData?.title_en || pageSettings.data[0]?.title_en || "VIA");

    const description =
      locale === Languages.ARABIC
        ? String(seoData?.description || "")
        : String(seoData?.description_en || "");

    const keywords =
      locale === Languages.ARABIC
        ? String(seoData?.keywords || "")
        : String(seoData?.keywords_en || "");

    const imageUrl = String(
      seoData?.meta_image || pageSettings.data[0]?.banner?.data?.full_url || ""
    );

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: "/",
        siteName: title,
        images: imageUrl ? [{ url: imageUrl }] : [],
        locale: locale === "ar" ? "ar_SA" : "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "VIA",
      description: "",
    };
  }
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
