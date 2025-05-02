"use client";
import { Button } from "@/components/ui/button";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Languages } from "@/constants/enums";
import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { HeroItem } from "@/types/hero";

interface HeroResponse {
  data: HeroItem[];
}

function Hero() {
  const params = useParams();
  const locale = params?.locale as string;
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, loading, error } = useFetch<HeroResponse>(
    "/items/hero_section"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading hero section</div>;

  const heroItems = data?.data.sort((a, b) => a.sort - b.sort) || [];

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
    <section className="px-4 md:ml-[80px] md:mr-[34px]">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        className="w-full"
      >
        {heroItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-[24px]">
              <div className="text-white w-full md:w-[744px] text-center md:text-left">
                <h1 className="font-bold text-[40px] md:text-[64px]">
                  {locale === Languages.ARABIC ? item.title : item.title_en}
                  <span className="text-primary block">
                    {locale === Languages.ARABIC
                      ? item.sub_title
                      : item.sub_title_en}
                  </span>
                </h1>
                <p className="font-medium text-[18px] md:text-[24px] mt-4">
                  {locale === Languages.ARABIC ? item.text : item.text_en}
                </p>
                <Button
                  className="mt-[24px] rounded-tl-[16px] rounded-br-[16px] rounded-bl-none rounded-tr-none"
                  onClick={() =>
                    (window.location.href =
                      locale === Languages.ARABIC
                        ? item.button_url
                        : item.button_url_en)
                  }
                >
                  {locale === Languages.ARABIC
                    ? item.button_text
                    : item.button_text_en}
                </Button>
              </div>

              <div className="w-full md:w-[530px] h-[300px] md:h-[530px] relative mt-8 md:mt-8 animate-float">
                <Image
                  src={`/api/files/${item.banner}`}
                  alt={locale === Languages.ARABIC ? item.title : item.title_en}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col items-center gap-2 mt-8">
        <div className="flex items-center gap-4 justify-center">
          <Button
            onClick={handlePrevSlide}
            className="text-primary bg-transparent border border-primary w-[56px] h-[56px] text-[28px] hover:bg-[#FFCD054D] hover:text-white cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={locale === Languages.ARABIC ? "rotate-180" : ""}
            />
          </Button>
          <Button
            onClick={handleNextSlide}
            className="rounded-tr-[16px] rounded-bl-[16px] rounded-tl-none rounded-br-none text-primary bg-transparent border border-primary w-[56px] h-[56px] text-[28px] hover:bg-[#FFCD054D] hover:text-white cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className={locale === Languages.ARABIC ? "rotate-180" : ""}
            />
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          {heroItems.map((_, idx) => (
            <div
              key={idx}
              className={`h-[10px] w-[48px] transition-all duration-200 ${
                activeIndex === idx
                  ? "bg-[#FFD600]"
                  : "bg-[#4B3F13] border border-[#FFD600]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
