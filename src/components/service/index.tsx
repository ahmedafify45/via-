"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ServicesCard from "./ServicesCard";
import { fetcher } from "@/lib/fetcher";

interface Service {
  id: number;
  name_en: string;
  slug: string;
  summary_en: string;
  description_en: string;
  photo: number;
  banner: number;
  icon: string;
}

interface ServicesResponse {
  data: Service[];
  public: boolean;
}

interface ServiceSectionProps {
  onSwiperInit: (swiper: SwiperType) => void;
}

function ServiceSection({ onSwiperInit }: ServiceSectionProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetcher<ServicesResponse>("/items/services");
        setServices(data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
        {services.map((service) => (
          <SwiperSlide key={service.id}>
            <ServicesCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ServiceSection;
