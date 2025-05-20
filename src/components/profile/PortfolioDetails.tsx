"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import { useParams } from "next/navigation";
import { Metadata } from "next";
import { PageProps } from "@/types/page";
import { ApiResponse } from "@/types/api";

// import Banner from "../custom/banner";
import OurClients from "@/app/[locale]/_components/OurClients";

import { PortfolioItem } from "@/types/portfolio";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { Languages } from "@/constants/enums";
import DOMPurify from "dompurify";
import CallToAction from "@/app/[locale]/_components/CallToAction";
import Loading from "../Loading";
import Banner from "../custom/banner";
import { serverFetcher } from "@/lib/serverFetcher";

interface PageSettings {
  title: string;
  title_en: string;
  banner: {
    data: {
      full_url: string;
    };
  };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const pageSettings = await serverFetcher<ApiResponse>("/items/portfolios", {
    fields: "*.*",
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

function PortfolioDetails() {
  const params = useParams();
  const locale = params?.locale as string;
  const thumbsSwiper: SwiperType | null = null;
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: pageSettings } = useFetch<{ data: PageSettings[] }>(
    "/items/other_pages",
    {
      fields: "*.*",
      "filter[slug]": "portfolio",
    }
  );

  const { data, loading, error } = useFetch<{ data: PortfolioItem[] }>(
    "/items/portfolios",
    {
      fields: "*.*",
    }
  );

  if (loading) {
    return (
      <div className="w-full text-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center text-red-500">
        Error loading portfolio
      </div>
    );
  }

  const portfolio = data?.data.find((item) => item.slug === params.slug);

  if (!portfolio) {
    return <div className="w-full text-center">Portfolio not found</div>;
  }

  const displayName =
    locale === Languages.ARABIC ? portfolio.name : portfolio.name_en;
  const displayDescription =
    locale === Languages.ARABIC
      ? portfolio.description
      : portfolio.description_en;

  const sanitizedContent = DOMPurify.sanitize(displayDescription);

  return (
    <main className="overflow-hidden ">
      <div className="px-4 md:px-[80px] my-[220px] overflow-hidden">
        <Banner pageSettings={pageSettings?.data || []} locale={locale} />
        <div className="mt-8">
          <h1 className="flex items-center justify-center text-primary text-[32px] md:text-[48px] font-bold mb-[24px]">
            {locale === Languages.ARABIC ? "معرض المشروع" : "Project Gallery"}
          </h1>

          {/* Main Swiper */}
          <div className="mb-4 relative">
            <Swiper
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Thumbs]}
              className="h-[300px] md:h-[500px] rounded-lg"
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              navigation
              pagination={{ clickable: true }}
            >
              {portfolio.banner && portfolio.banner.data && (
                <SwiperSlide>
                  <div className="relative w-full h-full">
                    <Image
                      src={portfolio.banner.data.full_url}
                      alt={displayName}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            <div className="flex gap-4 mt-4 items-center justify-center">
              {portfolio.banner && portfolio.banner.data && (
                <div
                  className={`h-[10px] w-[48px] transition-all duration-200 ${
                    activeIndex === 0
                      ? "bg-[#FFD600]"
                      : "bg-[#4B3F13] border border-[#FFD600]"
                  }`}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-[50px]  flex flex-col md:flex-row justify-between gap-6">
          <div className="rounded-[4px] w-full p-10">
            <h2 className="text-[32px] xl:text-[48px] font-bold text-primary">
              {locale === Languages.ARABIC
                ? "تفاصيل المشروع"
                : "Project Details"}
            </h2>
            <div
              className="text-[16px] xl:text-[18px] text-white "
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            ></div>
          </div>
          <div className="bg-[#FFFFFF0D] flex flex-col gap-[16px] md:gap-[24px] rounded-[4px] w-[600px] py-15 px-10">
            <div>
              <h4 className="text-primary text-[18px] xl:text-[24px] font-bold">
                {locale === Languages.ARABIC ? "العميل" : "Client"}
              </h4>
              <p className="text-white text-[14px] ">{portfolio.client}</p>
            </div>
            <div>
              <h4 className="text-primary text-[18px] xl:text-[24px] font-bold">
                {locale === Languages.ARABIC ? "الموقع" : "Location"}
              </h4>
              <p className="text-white text-[14px] ">{portfolio.location}</p>
            </div>
            <div>
              <h4 className="text-primary text-[18px] xl:text-[24px] font-bold">
                {locale === Languages.ARABIC ? "الحالة" : "Status"}
              </h4>
              <p className="text-white text-[14px]">{portfolio.status}</p>
            </div>
            <div>
              <h4 className="text-primary text-[18px] xl:text-[24px] font-bold">
                {locale === Languages.ARABIC ? "الموقع الإلكتروني" : "Website"}
              </h4>
              <Link
                href={portfolio.website}
                className="text-white text-[14px] hover:text-primary transition-all duration-200"
              >
                {portfolio.website}
              </Link>
            </div>
            <div>
              <h4 className="text-primary text-[18px] xl:text-[24px] font-bold">
                {locale === Languages.ARABIC ? "التاريخ" : "Date"}
              </h4>
              <p className="text-white text-[14px] ">
                {new Date(portfolio.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <OurClients />
        </div>
      </div>
      <div className="mb-10">
        <CallToAction />
      </div>
    </main>
  );
}

export default PortfolioDetails;
