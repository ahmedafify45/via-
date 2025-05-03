"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ServicesCard from "./ServicesCard";
import { useFetch } from "@/hooks/useFetch";
import Loading from "../Loading";
import { Service } from "@/types/services";

interface ServicesResponse {
  data: Service[];
  public: boolean;
}

interface ServiceSectionProps {
  onSwiperInit: (swiper: SwiperType) => void;
}

function ServiceSection({ onSwiperInit }: ServiceSectionProps) {
  const { data, loading, error } = useFetch<ServicesResponse>(
    "/items/services",
    {
      fields: "*.*",
    }
  );

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching services</div>;
  }

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
        {data?.data.map((service) => (
          <SwiperSlide key={service.id}>
            <ServicesCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ServiceSection;
