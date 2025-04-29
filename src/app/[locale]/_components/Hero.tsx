"use client"
import { Button } from "@/components/ui/button";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const heroItems = [
    {
      id: 1,
      title: "Transform Your Brand's",
      subtitle: "Digital Presence",
      description: "We craft strategic marketing campaigns that elevate your brand, engage your audience, and drive measurable results.",
      image: "/images/hero.png"
    },
    {
      id: 2,
      title: "Elevate Your Business",
      subtitle: "With Innovation",
      description: "Cutting-edge solutions that transform your business and set you apart from the competition.",
      image: "/images/aboutus.png"
    },
    {
      id: 3,
      title: "Grow Your Audience",
      subtitle: "With Strategy",
      description: "Data-driven strategies that help you reach and engage your target audience effectively.",
      image: "/images/hero.png"
    }
  ];

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
        className="w-full"
      >
        {heroItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-[24px]">
              <div className="text-white w-full md:w-[744px] text-center md:text-left">
                <h1 className="font-bold text-[40px] md:text-[64px]">
                  {item.title}
                  <span className="text-primary block">{item.subtitle}</span>
                </h1>
                <p className="font-medium text-[18px] md:text-[24px] mt-4">
                  {item.description}
                </p>
                <Button className="mt-[24px] rounded-tl-[16px] rounded-br-[16px] rounded-bl-none rounded-tr-none">
                  Start Your Project
                </Button>
              </div>

              <div className="w-full md:w-[530px] h-[300px] md:h-[530px] relative mt-8 md:mt-0">
                <Image
                  src={item.image}
                  alt="Hero illustration"
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
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <Button 
            onClick={handleNextSlide}
            className="rounded-tr-[16px] rounded-bl-[16px] rounded-tl-none rounded-br-none text-primary bg-transparent border border-primary w-[56px] h-[56px] text-[28px] hover:bg-[#FFCD054D] hover:text-white cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          {heroItems.map((_, idx) => (
            <div
              key={idx}
              className={`h-[10px] w-[48px] transition-all duration-200 ${
                activeIndex === idx
                  ? "bg-[#FFD600]" // yellow
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
