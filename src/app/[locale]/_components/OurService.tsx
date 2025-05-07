"use client";

import { useRef } from "react";
import ServiceSection from "@/components/service";
import { Button } from "@/components/ui/button";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Swiper as SwiperType } from "swiper";
import { Languages } from "@/constants/enums";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

interface HomePageSetting {
  id: number;
  sort: number;
  title: string;
  how_many: number;
  is_active: boolean;
  title_en: string;
  slug: string;
}

function OurService() {
  const params = useParams();
  const locale = params?.locale as string;
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: servicesData } = useFetch<{ data: HomePageSetting[] }>(
    "/items/home_page_setting",
    {
      "filter[slug]": "services-area",
    }
  );

  const title =
    locale === Languages.ARABIC
      ? servicesData?.data?.[0]?.title
      : servicesData?.data?.[0]?.title_en;

  const isActive = servicesData?.data?.[0]?.is_active;

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <>
      {isActive && (
        <section className="mt-[80.54px] mx-[20px] xl:mx-[80px]">
          <div className="flex items-center justify-between mb-[40px] lg:mb-[10px]">
            <p className="xl:text-[48px] font-bold text-primary text-[20px]">
              {title}
            </p>
            <div className="flex items-center gap-[20px] ">
              <Button
                onClick={handlePrevSlide}
                className={`bg-transparent hover:bg-[#FFCD054D] border border-primary hover:text-white text-primary ${
                  locale === Languages.ARABIC ? "rotate-180" : ""
                }`}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Button
                onClick={handleNextSlide}
                className={`bg-transparent hover:bg-[#FFCD054D] border border-primary hover:text-white text-primary ${
                  locale === Languages.ARABIC ? "rotate-180" : ""
                }`}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
          <ServiceSection onSwiperInit={handleSwiperInit} />
        </section>
      )}
    </>
  );
}

export default OurService;
