"use client";

import { useRef } from "react";
import ServiceSection from "@/components/service";
import { Button } from "@/components/ui/button";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Swiper as SwiperType } from "swiper";

function OurService() {
  const swiperRef = useRef<SwiperType | null>(null);

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
    <section className="mt-[80.54px] mx-[80px]">
      <div className="flex items-center justify-between">
        <p className="md:text-[48px] font-bold text-primary text-[20px]">
          Our Services
        </p>
        <div className="flex items-center gap-[20px]">
          <Button
            onClick={handlePrevSlide}
            className="bg-transparent hover:bg-[#FFCD054D] border border-primary hover:text-white text-primary"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <Button
            onClick={handleNextSlide}
            className="bg-transparent hover:bg-[#FFCD054D] border border-primary hover:text-white text-primary"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>
      <ServiceSection onSwiperInit={handleSwiperInit} />
    </section>
  );
}

export default OurService;
