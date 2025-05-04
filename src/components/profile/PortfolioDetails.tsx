"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";
import { useParams } from "next/navigation";

import Banner from "../custom/banner";
import OurClients from "@/app/[locale]/_components/OurClients";
import TransformBrand from "./TransformBrand";
import { PortfolioItem } from "@/types/portfolio";
import { useFetch } from "@/hooks/useFetch";

function PortfolioDetails() {
  const params = useParams();
  const thumbsSwiper: SwiperType | null = null;
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, loading, error } = useFetch<{ data: PortfolioItem[] }>(
    "/items/portfolios",
    {
      fields: "*.*",
    }
  );

  if (loading) {
    return <div className="w-full text-center">Loading...</div>;
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

  return (
    <main>
      <div className="px-4 md:px-[80px] md:my-[220px]">
        <Banner
          title={"Our Portfolio"}
          subtitle="Home / Portfolio / Portfolio Details"
        />
        <div className="mt-8">
          <h1 className="flex items-center justify-center text-primary text-[32px] md:text-[48px] font-bold mb-[24px]">
            Project Gallery
          </h1>

          {/* Main Swiper */}
          <div className="mb-4 relative">
            <Swiper
              spaceBetween={10}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Thumbs]}
              className="h-[300px] md:h-[500px] rounded-lg"
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              <SwiperSlide>
                <div className="relative w-full h-full">
                  <Image
                    src={portfolio.thumbnail.data.full_url}
                    alt={portfolio.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
              {portfolio.banner && portfolio.banner.data && (
                <SwiperSlide>
                  <div className="relative w-full h-full">
                    <Image
                      src={portfolio.banner.data.full_url}
                      alt={portfolio.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            <div className="flex gap-4 mt-4 items-center justify-center">
              <div
                className={`h-[10px] w-[48px] transition-all duration-200 ${
                  activeIndex === 0
                    ? "bg-[#FFD600]" // yellow
                    : "bg-[#4B3F13] border border-[#FFD600]"
                }`}
              />
              {portfolio.banner && portfolio.banner.data && (
                <div
                  className={`h-[10px] w-[48px] transition-all duration-200 ${
                    activeIndex === 1
                      ? "bg-[#FFD600]" // yellow
                      : "bg-[#4B3F13] border border-[#FFD600]"
                  }`}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-[50px] md:mt-[158px] flex flex-col md:flex-row justify-between gap-6">
          <div className="bg-[#FFFFFF0D] py-[18px] px-[16px] rounded-[4px]">
            <h2 className="text-[32px] md:text-[48px] font-medium text-primary">
              Project Details
            </h2>
            <p className="text-white text-[14px] max-w-full md:max-w-[706px] max-h-[436px]">
              {portfolio.description}
            </p>
          </div>
          <div className="bg-[#FFFFFF0D] py-[24px] md:py-[48px] px-[16px] flex flex-col gap-[16px] md:gap-[24px] rounded-[4px]">
            <div>
              <h4 className="text-primary text-[24px] md:text-[32px] font-bold">
                Client
              </h4>
              <p className="text-white text-[18px] md:text-[24px] font-medium">
                {portfolio.client}
              </p>
            </div>
            <div>
              <h4 className="text-primary text-[24px] md:text-[32px] font-bold">
                Location
              </h4>
              <p className="text-white text-[18px] md:text-[24px] font-medium">
                {portfolio.location}
              </p>
            </div>
            <div>
              <h4 className="text-primary text-[24px] md:text-[32px] font-bold">
                Status
              </h4>
              <p className="text-white text-[18px] md:text-[24px]">
                {portfolio.status}
              </p>
            </div>
            <div>
              <h4 className="text-primary text-[24px] md:text-[32px] font-bold">
                Website
              </h4>
              <p className="text-white text-[18px] md:text-[24px]">
                {portfolio.website}
              </p>
            </div>
            <div>
              <h4 className="text-primary text-[24px] md:text-[32px] font-bold">
                Date
              </h4>
              <p className="text-white text-[18px] md:text-[24px] font-medium">
                {new Date(portfolio.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <OurClients />
        </div>
        <TransformBrand />
      </div>
    </main>
  );
}

export default PortfolioDetails;
