"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ServicesCard from "./ServicesCard";

interface ServiceSectionProps {
  onSwiperInit: (swiper: SwiperType) => void;
}

function ServiceSection({ onSwiperInit }: ServiceSectionProps) {
  const serviceSection = [
    {
      id: 1,
      slug: "digital-marketing",
      image: "/images/service/service1.png",
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing solutions to boost your online presence",
      link: "/services/digital-marketing",
    },
    {
      id: 2,
      slug: "social-media-management",
      image: "/images/service/service2.png",
      title: "Social Media Management",
      description: "Strategic social media management to engage your audience",
      link: "/services/social-media-management",
    },
    {
      id: 3,
      slug: "content-creation",
      image: "/images/service/service3.png",
      title: "Content Creation",
      description: "Creative content that tells your brand's story",
      link: "/services/content-creation",
    },
    {
      id: 4,
      slug: "content-marketing",
      image: "/images/service/service3.png",
      title: "Content Marketing",
      description: "Creative content that tells your brand's story",
      link: "/services/content-marketing",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        navigation={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={onSwiperInit}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="service-swiper"
      >
        {serviceSection.map((service) => (
          <SwiperSlide key={service.slug}>
            <ServicesCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ServiceSection;
