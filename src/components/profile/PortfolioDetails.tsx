"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/thumbs";

import Banner from "../custom/banner";
import OurClients from "@/app/_components/OurClients";
import TransformBrand from "./TransformBrand";

interface PortfolioDetailsProps {
  portfolio: {
    title: string;
    image: string;
    slug: string;
    description: string;
    client: string;
    location: string;
    status: string;
    projectValue: string;
    side: string;
    size: string;
    gallery: {
      image: string;
      alt: string;
    }[];
  };
}

function PortfolioDetails({ portfolio }: PortfolioDetailsProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <main>
      <div className="px-4 md:px-[80px] py-[50px] md:py-[150px]">
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
            >
              {portfolio.gallery.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Slider - Positioned absolutely at bottom center */}
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
                Project value
              </h4>
              <p className="text-white text-[18px] md:text-[24px]">
                {portfolio.projectValue}
              </p>
            </div>
            <div>
              <h4 className="text-primary text-[24px] md:text-[32px] font-bold">
                Size
              </h4>
              <p className="text-white text-[18px] md:text-[24px] font-medium">
                {portfolio.size}
              </p>
            </div>
          </div>
        </div>
        <OurClients />
        <TransformBrand />
      </div>
    </main>
  );
}

export default PortfolioDetails;
