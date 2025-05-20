"use client";
import Image from "next/image";
import StarRating from "../custom/StarRating";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFetch } from "@/hooks/useFetch";
import { Languages } from "@/constants/enums";

// Import Swiper styles
import "swiper/css";
import { useParams } from "next/navigation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  name_en: string;
  company: string;
  rating: number;
  avatar: { data: { full_url: string } };
  comment: string;
  comment_en: string;
}

interface TestimonialsResponse {
  data: Testimonial[];
  public: boolean;
}

function Clients() {
  const params = useParams();
  const locale = params?.locale as string;
  const swiperRef = useRef<SwiperType | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { data: testimonialsData } = useFetch<TestimonialsResponse>(
    "/items/testimonials",
    {
      fields: "*.*",
    }
  );

  useEffect(() => {
    // Initialize GSAP animations for each image
    imageRefs.current.forEach((imageRef) => {
      if (imageRef) {
        gsap.fromTo(
          imageRef,
          {
            clipPath: "circle(0% at 50% 50%)",
          },
          {
            clipPath: "circle(50% at 50% 50%)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  if (!testimonialsData?.data) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="w-full">
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          className="w-full"
        >
          {testimonialsData.data.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <div className="relative overflow-hidden min-h-[280px] md:min-h-[360px]">
                <div
                  ref={(el) => {
                    if (el) imageRefs.current[index] = el;
                  }}
                  className="w-20 h-20 md:w-32 md:h-32 rounded-full m-auto overflow-hidden relative z-10"
                >
                  <Image
                    src={testimonial.avatar?.data?.full_url}
                    alt={
                      locale === Languages.ARABIC
                        ? testimonial.name
                        : testimonial.name_en
                    }
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center w-[90%] md:w-[80%] lg:w-[90%] max-h-[240px] md:max-h-[368px] flex absolute top-[45px] md:top-[60px] left-1/2 -translate-x-1/2 z-0">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="pt-8 md:pt-16 px-4 md:px-8">
                      <h3 className="text-lg md:text-xl font-semibold mb-2 mt-[15px] md:mt-[27px]">
                        {locale === Languages.ARABIC
                          ? testimonial.name
                          : testimonial.name_en}
                      </h3>
                      <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                        {testimonial.company}
                      </p>
                      <div className="flex justify-center mb-3 md:mb-6">
                        <StarRating rating={testimonial.rating} />
                      </div>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed md:leading-loose max-w-2xl mx-auto line-clamp-3 md:line-clamp-none">
                        {locale === Languages.ARABIC
                          ? testimonial.comment
                          : testimonial.comment_en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center gap-4 mt-8">
          <Button
            className="bg-[#D6D6D6] text-black rounded-full hover:bg-primary w-10 h-10 md:w-12 md:h-12 transition-all duration-300"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={`w-5 md:w-6 ${
                locale === Languages.ARABIC ? "rotate-180" : ""
              }`}
            />
          </Button>
          <Button
            className="bg-[#D6D6D6] text-black rounded-full hover:bg-primary w-10 h-10 md:w-12 md:h-12 transition-all duration-300"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className={`w-5 md:w-6 ${
                locale === Languages.ARABIC ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Clients;
