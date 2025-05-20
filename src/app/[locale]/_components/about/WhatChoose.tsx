/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";

// Add all solid icons to the library
library.add(fas);
interface HomePageSettingResponse {
  data: Array<{
    id: number;
    sort: number;
    title: string;
    sub_title: string;
    how_many: number;
    is_active: boolean;
    title_en: string;
    sub_title_en: string;
    button_text: string;
    button_text_en: string;
    button_url: string;
    button_url_en: string;
    slug: string;
  }>;
  public: boolean;
}
function WhatChoose() {
  const params = useParams();
  const locale = params.locale as string;
  const { data, loading, error } = useFetch<{ data: CoreValue[] }>(
    "/items/about_core_values",
    {
      fields: "*.*",
    }
  );
  const whyChooseUs = useFetch<HomePageSettingResponse>(
    "/items/home_page_setting",
    {
      "filter[slug]": "core-values-area",
    }
  );

  if (
    !whyChooseUs?.data?.data?.[0] ||
    whyChooseUs.data.data[0].is_active === false
  ) {
    return null;
  }

  const whyChooseUsData = whyChooseUs.data.data[0];
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading core values</div>;
  if (!data?.data) return null;

  // Function to convert Font Awesome class to icon name
  const getIconName = (iconClass: string) => {
    // Remove 'fas fa-' prefix and return the icon name
    return iconClass.replace("fas fa-", "");
  };

  return (
    <div className="mx-4 xl:mx-[80px] h-[450px] ">
      <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[36px] xl:text-[48px] font-bold text-primary">
          {locale === Languages.ARABIC
            ? whyChooseUsData.title
            : whyChooseUsData.title_en}
        </h4>
        <p className="text-[14px] sm:text-[20px] xl:text-[24px] font-medium text-[#FFFFFF] max-w-[567px] mt-4 sm:mt-6">
          {locale === Languages.ARABIC
            ? whyChooseUsData.sub_title
            : whyChooseUsData.sub_title_en}
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
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 4,
            },

            1300: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {data.data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[180px] xl:h-[193px] w-full">
                <div className="flex justify-center mb-2 w-[32px] h-[32px] md:w-[36px] md:h-[36px] lg:w-[40px] lg:h-[40px] text-primary text-[32px] md:text-[36px] lg:text-[40px]">
                  <FontAwesomeIcon icon={getIconName(item.icon) as any} />
                </div>
                <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-medium mb-[12px] md:mb-[14px] lg:mb-[16px]">
                  {locale === Languages.ARABIC ? item.title : item.title_en}
                </h4>
                <p className="text-[#0C0D0F] text-center text-[12px] mdP:text-[13px] lg:text-[14px] pb-[12px] md:pb-[14px] lg:pb-[16px]">
                  {locale === Languages.ARABIC ? item.text : item.text_en}
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
