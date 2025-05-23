"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import AboutDetails from "./AboutDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Loader } from "lucide-react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import * as RegularIcons from "@fortawesome/free-regular-svg-icons";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AboutResponse {
  data: {
    id: number;
    sort: number;
    title: string;
    title_en: string;
    sub_title: string;
    sub_title_en: string;
    text: string;
    text_en: string;
    image: number;
    video: number;
    key_points: Array<{
      title: string;
      title_en: string;
      text: string;
      text_en: string;
      icon: string;
    }>;
    public: boolean;
  }[];
}

interface HomePageSettingResponse {
  data: {
    id: number;
    sort: number | null;
    title: string | null;
    is_active: boolean;
    title_en: string | null;
    button_text: string;
    button_text_en: string;
    button_url: string;
    button_url_en: string;
    slug: string;
    image: { data: { full_url: string } };
  }[];
  public: boolean;
}

interface ClientData {
  id: number;
  sort: number | null;
  photo: { data: { full_url: string } };
  url: string | null;
}

interface ClientsResponse {
  data: ClientData[];
  public: boolean;
}

function AboutUs() {
  const params = useParams();
  const locale = params?.locale as string;
  const aboutImageRef = useRef<HTMLImageElement>(null);

  const {
    data: aboutData,
    loading: aboutLoading,
    error: aboutError,
  } = useFetch<AboutResponse>("/items/about_section", { fields: "*.*" });

  const {
    data: homePageSettingData,
    loading: homePageSettingLoading,
    error: homePageSettingError,
  } = useFetch<HomePageSettingResponse>("/items/home_page_setting", {
    fields: "*.*",
    "filter[slug]": "about-area",
  });

  const {
    data: clientsData,
    loading: clientsLoading,
    error: clientsError,
  } = useFetch<ClientsResponse>("/items/clients", { fields: "*.*" });

  useEffect(() => {
    if (aboutImageRef.current) {
      const image = aboutImageRef.current;

      ScrollTrigger.create({
        trigger: image,
        start: "top center",
        onEnter: () => {
          gsap.to(image, {
            rotation: 0,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    }
  }, []);

  if (aboutLoading || homePageSettingLoading || clientsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (aboutError || homePageSettingError || clientsError) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-red-500">
        Error loading data
      </div>
    );
  }

  if (
    !aboutData?.data ||
    aboutData.data.length === 0 ||
    !homePageSettingData?.data ||
    homePageSettingData.data.length === 0
  ) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        No data available
      </div>
    );
  }

  const about = aboutData.data[0];
  const homePageSetting = homePageSettingData.data[0];
  const keyPoints = about?.key_points || [];

  return (
    <section className="md:px-0" dir="ltr">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            ref={aboutImageRef}
            src="/images/aboutus.png"
            alt={locale === Languages.ENGLISH ? about?.title_en : about?.title}
            width={800}
            height={535}
            className={`h-auto object-contain scale-90 md:scale-100 will-change-transform `}
            priority
          />
        </motion.div>
        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="bg-cover w-full h-auto md:h-[612px] overflow-hidden [transform:scaleX(-1)] md:[transform:scaleX(1)]"
            style={{
              backgroundImage: `url(${
                typeof window !== "undefined" && window.innerWidth >= 750
                  ? "/images/aboutus_text.png"
                  : "/images/about_usmobile.png"
              })`,
            }}
          >
            <div
              className="px-3 lg:px-4 md:ml-[155px] py-8 md:py-0 [transform:scaleX(-1)] md:[transform:scaleX(1)]"
              dir={locale === Languages.ENGLISH ? "ltr" : "rtl"}
            >
              <h2 className="font-bold text-3xl xl:text-[48px] text-black pt-8 md:pt-[92px] 2xl:pt-[120px]">
                {locale === Languages.ENGLISH ? about?.title_en : about?.title}
              </h2>
              <p className="mb-4 md:mb-[16px] mt-2 text-base md:text-sm xl:text-lg">
                {locale === Languages.ENGLISH ? about?.text_en : about?.text}
              </p>
              <div className="flex flex-col gap-4 lg:gap-2">
                {keyPoints.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-[40px] md:w-[44px] h-[40px] lg:h-[44px] bg-[#0C0D0F] rounded-tl-[16px] rounded-br-[16px] text-primary text-[18px] flex items-center justify-center">
                      {item.icon && (
                        <FontAwesomeIcon
                          icon={
                            (RegularIcons[
                              item.icon as keyof typeof RegularIcons
                            ] ||
                              SolidIcons[
                                item.icon as keyof typeof SolidIcons
                              ]) as IconProp
                          }
                          className="w-[16px] md:w-[18px] h-[24px] md:h-[26px]"
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[12px] xl:text-[24px] font-bold">
                        {locale === Languages.ENGLISH
                          ? item.title_en
                          : item.title}
                      </p>
                      <p className="text-base font-normal mt-1">
                        {locale === Languages.ENGLISH
                          ? item.text_en
                          : item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="text-black w-[150px] lg:w-[220px] h-[40px] xl:h-[50px] p-[16px] mt-6 md:mt-[24px]"
                onClick={() =>
                  (window.location.href =
                    locale === Languages.ENGLISH
                      ? homePageSetting.button_url_en
                      : homePageSetting.button_url)
                }
              >
                {locale === Languages.ENGLISH
                  ? homePageSetting.button_text_en
                  : homePageSetting.button_text}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={locale === Languages.ARABIC ? "rotate-180" : ""}
                />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      {clientsData?.data && clientsData.data.length > 0 && (
        <div className="bg-white rounded-tl-[16px] rounded-br-[16px] w-full md:w-[90%] lg:w-[1284px] h-auto md:h-[96px] mx-auto p-4 md:p-0">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            className="w-full h-full flex items-center"
          >
            {clientsData.data.map((client) => (
              <SwiperSlide
                key={client.id}
                className="flex items-center justify-center h-full"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <a
                    href={client.url || "#"}
                    target={client.url ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={client.photo?.data?.full_url || ""}
                      alt={`Client ${client.id}`}
                      width={100}
                      height={50}
                      className="w-auto h-auto object-contain max-w-[80%] md:max-w-[90%] lg:max-w-full"
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <AboutDetails />
    </section>
  );
}

export default AboutUs;
