"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

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
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={false}
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
            <Link href={service.link}>
              <div className="group relative overflow-hidden rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ServiceSection;
