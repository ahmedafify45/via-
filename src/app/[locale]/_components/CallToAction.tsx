"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import Loading from "@/components/Loading";

interface CallToActionData {
  id: number;
  status: string;
  sort: null;
  owner: number;
  title: string;
  sub_title: string;
  button_text: string;
  button_url: string;
  title_en: string;
  sub_title_en: string;
  button_text_en: string;
  button_url_en: string;
  image: { data: { full_url: string } };
  slider: string;
}

function CallToAction() {
  const params = useParams();
  const locale = params.locale as string;
  const { data, loading, error } = useFetch<{ data: CallToActionData[] }>(
    "/items/calltoaction_settings",
    {
      fields: "*.*",
    }
  );

  const portfolioAds: { id: number; title: string; image: string }[] = [];

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  if (error) return <div>Error loading data</div>;
  if (!data?.data?.[0]) return null;

  const callToActionData = data.data[0];

  if (callToActionData.slider) {
    const sliderData = callToActionData.slider.split(",");

    sliderData.map((item: string, index: number) =>
      portfolioAds.push({
        id: index,
        title: item,
        image: "/images/iconPortflio.png",
      })
    );
  }

  // Create unique IDs for duplicated items
  const originalLength = portfolioAds.length;
  for (let i = 0; i < 5; i++) {
    portfolioAds.push(
      ...portfolioAds.slice(0, originalLength).map((item, index) => ({
        ...item,
        id: originalLength * (i + 1) + index,
      }))
    );
  }

  const title =
    locale === Languages.ENGLISH
      ? callToActionData.title_en
      : callToActionData.title;
  const subTitle =
    locale === Languages.ENGLISH
      ? callToActionData.sub_title_en
      : callToActionData.sub_title;
  const buttonText =
    locale === Languages.ENGLISH
      ? callToActionData.button_text_en
      : callToActionData.button_text;
  const buttonUrl =
    locale === Languages.ENGLISH
      ? callToActionData.button_url_en
      : callToActionData.button_url;

  return (
    <section className="bg-[#181818] text-white mt-[84.5px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:ml-[110px] gap-[13px]">
        <div className="max-w-[700px] max-h-[158px] flex flex-col justify-center items-center mx-auto lg:mx-0">
          <p className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-medium text-center mt-[100px] lg:mt-0">
            {title}
          </p>
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-center mt-[16px]">
            {subTitle}
          </p>
          <Button
            className="text-[16px] sm:text-[18px] lg:text-[20px] p-[12px] sm:p-[14px] lg:p-[16px] max-w-[280px] sm:max-w-[302px] h-[45px] sm:h-[50px] mt-[16px] text-black"
            onClick={() => (window.location.href = buttonUrl)}
          >
            {buttonText}
          </Button>
        </div>
        <div className="w-full h-auto mt-14 lg:mt-0">
          <Image
            src={callToActionData.image?.data?.full_url}
            alt={title}
            width={768}
            height={590}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div className="bg-primary text-black w-[100%] h-[80px] sm:h-[90px] md:h-[110px] -rotate-[3deg] relative overflow-hidden mt-8">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={2}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
          }}
          loop={true}
          freeMode={true}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={1000}
          className="h-full flex items-center"
        >
          {portfolioAds.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center h-full"
            >
              <div
                className="flex items-center justify-center gap-2 h-full"
                dir="ltr"
              >
                <Image
                  src="/images/iconPortflio.png"
                  alt={item.title}
                  width={20}
                  height={24}
                  className="flex-shrink-0 w-[20px] h-[24px] sm:w-[26px] sm:h-[31px]"
                />
                <h2 className="text-[24px] sm:text-[18px] md:text-[20px] font-medium whitespace-nowrap text-center">
                  {item.title}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default CallToAction;
