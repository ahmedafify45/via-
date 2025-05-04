"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faStar,
  faHandshake,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
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

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AboutResponse {
  data: {
    title: string;
    text: string;
    title_en: string;
    text_en: string;
    key_points: Array<{ text: string }>;
    key_points_en: Array<{ text: string }>;
  };
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
  } = useFetch<AboutResponse>("/items/about_section/1", { fields: "*.*" });

  const {
    data: clientsData,
    loading: clientsLoading,
    error: clientsError,
  } = useFetch<ClientsResponse>("/items/clients", { fields: "*.*" });

  useEffect(() => {
    if (aboutImageRef.current) {
      const image = aboutImageRef.current;

      // Create a trigger point for the final position
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

  if (aboutLoading || clientsLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (aboutError || clientsError) return <div>Error loading data</div>;

  const about = aboutData?.data;
  const keyPoints =
    locale === Languages.ARABIC ? about?.key_points : about?.key_points_en;

  const aboutUsIcon = [
    { icon: faLightbulb },
    { icon: faStar },
    { icon: faHandshake },
    { icon: faLightbulb },
  ];

  return (
    <section className="md:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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
            alt={
              locale === Languages.ARABIC
                ? about?.title || ""
                : about?.title_en || ""
            }
            width={422}
            height={535}
            className={`w-full h-auto object-contain scale-90 md:scale-100 will-change-transform ${
              locale === Languages.ARABIC ? "rotate-y-180" : ""
            }`}
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
            style={{ backgroundImage: "url('/images/aboutus_text.png')" }}
          >
            <div className="px-4 md:ml-[155px] py-8 md:py-0 [transform:scaleX(-1)] md:[transform:scaleX(1)]">
              <h2 className="font-bold text-3xl md:text-[48px] text-black pt-8 md:pt-[92px]">
                {locale === Languages.ARABIC ? about?.title : about?.title_en}
              </h2>
              <p className="mb-4 md:mb-[16px] mt-4 md:mt-[24px] text-base md:text-lg">
                {locale === Languages.ARABIC ? about?.text : about?.text_en}
              </p>
              <div className="flex flex-col gap-4 md:gap-2">
                {keyPoints?.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-[40px] md:w-[44px] h-[40px] md:h-[44px] bg-[#0C0D0F] rounded-tl-[16px] rounded-br-[16px] text-primary text-[18px] flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={aboutUsIcon[index % aboutUsIcon.length].icon}
                        className="w-[16px] md:w-[18px] h-[24px] md:h-[26px]"
                      />
                    </div>
                    <p className="text-lg md:text-[24px] font-bold">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <Button className="text-black w-full md:w-[220px] h-[50px] p-[16px] mt-6 md:mt-[24px]">
                {locale === Languages.ARABIC
                  ? "المزيد من المعلومات"
                  : "More Info"}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={locale === Languages.ARABIC ? "rotate-180" : ""}
                />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
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
          {clientsData?.data.map((client) => (
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
      <AboutDetails />
    </section>
  );
}

export default AboutUs;
