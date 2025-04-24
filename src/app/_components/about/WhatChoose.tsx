"use client";
import {
  faHandshakeAngle,
  faLightbulb,
  faMedal,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function WhatChoose() {
  const whyChoose = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faLightbulb} />,
      title: "Creativity And Innovation",
      description:
        "We start with a small idea, nurture it with creativity, and protect it with integrity.Because great brands are built where innovation meets honesty.",
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faHandshakeAngle} />,
      title: "Creativity And Innovation",
      description:
        "We start with a small idea, nurture it with creativity, and protect it with integrity.Because great brands are built where innovation meets honesty.",
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faTrophy} />,
      title: "Creativity And Innovation",
      description:
        "We create boldly and act with integrity, because true collaboration grows from trust and transparency..",
    },
    {
      id: 4,
      icon: <FontAwesomeIcon icon={faMedal} />,
      title: "Creativity And Innovation",
      description:
        "We start with a small idea, nurture it with creativity, and protect it with integrity.Because great brands are built where innovation meets honesty.",
    },
  ];
  return (
    <div className="mx-4 md:mx-[40px] lg:mx-[80px] pb-[40px] md:pb-[60px] lg:pb-[75px]">
      <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[24px] md:text-[32px] lg:text-[48px] font-bold text-primary">
          Why Should Choose Us?
        </h4>
        <p className="text-[#FFFFFF] max-w-[1006px] text-[14px] md:text-[18px] lg:text-[24px] font-medium px-2 md:px-4 lg:px-0">
          Transform the way you work effortlessly track and complete tasks.
          Simplify your workflow, boost your productivity, and achieve more.
        </p>
      </div>
      <div className="mt-[20px] md:mt-[30px]">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {whyChoose.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 h-auto md:h-[180px] lg:h-[193px] w-full md:w-[320px] lg:w-[389px]">
                <div className="flex justify-center mb-2 w-[32px] h-[32px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] text-primary text-[32px] md:text-[36px] lg:text-[40px]">
                  {item.icon}
                </div>
                <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium mb-[12px] md:mb-[14px] lg:mb-[16px]">
                  {item.title}
                </h4>
                <p className="text-[#0C0D0F] text-center text-[12px] md:text-[13px] lg:text-[14px] pb-[12px] md:pb-[14px] lg:pb-[16px]">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default WhatChoose;
