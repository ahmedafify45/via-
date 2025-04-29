"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

function PortfolioAds() {
  const portfolioAds = [
    {
      id: 1,
      title: "Vision",
      image: "/images/iconPortflio.png",
    },
    {
      id: 2,
      title: "Innovation",
      image: "/images/iconPortflio.png",
    },
    {
      id: 3,
      title: "Action",
      image: "/images/iconPortflio.png",
    },
    {
      id: 4,
      title: "Action",
      image: "/images/iconPortflio.png",
    },
    {
      id: 5,
      title: "Excellence",
      image: "/images/iconPortflio.png",
    },
    {
      id: 6,
      title: "Action",
      image: "/images/iconPortflio.png",
    },
    {
      id: 7,
      title: "Action",
      image: "/images/iconPortflio.png",
    },
  ];

  return (
    <section className="bg-[#181818] text-white mt-[84.5px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:ml-[110px] gap-[13px]">
        <div className="max-w-[535px] max-h-[158px] flex flex-col justify-center items-center mx-auto lg:mx-0">
          <p className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-medium text-center mt-[100px] lg:mt-0">
            Your voice will be heard... and
            <br className="hidden sm:block" /> your sales will increase
          </p>
          <Button className="text-[16px] sm:text-[18px] lg:text-[20px] p-[12px] sm:p-[14px] lg:p-[16px] max-w-[280px] sm:max-w-[302px] h-[45px] sm:h-[50px] mt-[16px] text-black">
            Request a free consultation
          </Button>
        </div>
        <div className="w-full h-utoa mt-8 lg:mt-0">
          <Image
            src="/images/portfolioAds.png"
            alt="portfolioAds"
            width={768}
            height={590}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div className="bg-primary text-black w-[100%] h-[80px] sm:h-[90px] md:h-[110px] -rotate-[3deg] relative overflow-hidden mt-8">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loop={true}
          freeMode={true}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={1000}
          className="h-full flex items-center"
        >
          {portfolioAds.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center h-full"
            >
              <div className="flex items-center justify-center gap-2 h-full">
                <Image
                  src="/images/iconPortflio.png"
                  alt={item.title}
                  width={20}
                  height={24}
                  className="flex-shrink-0 w-[20px] h-[24px] sm:w-[26px] sm:h-[31px]"
                />
                <p className="text-[16px] sm:text-[18px] md:text-[20px] font-medium whitespace-nowrap text-center">
                  {item.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default PortfolioAds;
