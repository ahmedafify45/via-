"use client";
import { useFetch } from "@/hooks/useFetch";
import { CoreValue } from "@/types/about";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Languages } from "@/constants/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Add all solid icons to the library
library.add(fas);

function WhatChoose() {
  const { data, loading, error } = useFetch<{ data: CoreValue[] }>(
    "/items/about_core_values",
    {
      fields: "*.*",
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading core values</div>;
  if (!data?.data) return null;

  // Function to convert Font Awesome class to icon name
  const getIconName = (iconClass: string) => {
    // Remove 'fas fa-' prefix and return the icon name
    return iconClass.replace("fas fa-", "");
  };

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
          {data.data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 h-auto md:h-[180px] lg:h-[193px] w-full md:w-[320px] lg:w-[389px]">
                <div className="flex justify-center mb-2 w-[32px] h-[32px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] text-primary text-[32px] md:text-[36px] lg:text-[40px]">
                  <FontAwesomeIcon icon={getIconName(item.icon) as any} />
                </div>
                <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium mb-[12px] md:mb-[14px] lg:mb-[16px]">
                  {Languages.ARABIC ? item.title : item.title_en}
                </h4>
                <p className="text-[#0C0D0F] text-center text-[12px] md:text-[13px] lg:text-[14px] pb-[12px] md:pb-[14px] lg:pb-[16px]">
                  {Languages.ARABIC ? item.text : item.text_en}
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
