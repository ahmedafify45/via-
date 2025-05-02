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
  avatar: number;
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
    "/items/testimonials"
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
    <section className="py-16">
      <div className=" max-w-7xl">
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
              <div className="relative overflow-hidden min-h-[360px]">
                <div
                  ref={(el) => {
                    if (el) imageRefs.current[index] = el;
                  }}
                  className="w-32 h-32 rounded-full m-auto overflow-hidden"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${testimonial.avatar}`}
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
                <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[1280px] max-h-[368px] flex absolute top-[60px] z-[-1]">
                  <div className="rounded-lg flex gap-4 justify-center"></div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="relative -mt-16 mb-8">
                      <div className="absolute left-1/2 -translate-x-1/2 -top-4"></div>
                    </div>
                    <div className="pt-16">
                      <h3 className="text-xl font-semibold mb-2 mt-[27px]">
                        {locale === Languages.ARABIC
                          ? testimonial.name
                          : testimonial.name_en}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {testimonial.company}
                      </p>
                      <div className="flex justify-center mb-4">
                        <StarRating rating={testimonial.rating.toString()} />
                      </div>
                      <p className="text-gray-700">
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
        <div className="flex justify-center gap-4 mt-3">
          <Button
            className="bg-[#D6D6D6] text-black rounded-full hover:bg-primary w-[36px] h-[36px]"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={`w-[22px] ${
                locale === Languages.ARABIC ? "rotate-180" : ""
              }`}
            />
          </Button>
          <Button
            className="bg-[#D6D6D6] text-black rounded-full hover:bg-primary w-[36px] h-[36px]"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className={`w-[22px] ${
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
