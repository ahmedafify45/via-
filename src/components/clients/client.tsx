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

// Import Swiper styles
import "swiper/css";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Clients() {
  const params = useParams();
  const locale = params?.locale as string;
  const swiperRef = useRef<SwiperType | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize GSAP animations for each image
    imageRefs.current.forEach((imageRef, index) => {
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

  const clients = [
    {
      id: 1,
      image: "/images/client.png",
      name: "Leslie Alexander",
      jobs: "Marketing Coordinator",
      Evaluation:
        "via completely transformed our digital marketing strategy. Their creative approach to social media and influencer partnerships helped us reach new audiences we hadn't tapped into before. Our engagement rates have increased by 150% since working with them.",
      rating: "5",
    },
    {
      id: 2,
      image: "/images/client.png",
      name: "Leslie Alexander",
      jobs: "Marketing Coordinator",
      Evaluation:
        "via completely transformed our digital marketing strategy. Their creative approach to social media and influencer partnerships helped us reach new audiences we hadn't tapped into before. Our engagement rates have increased by 150% since working with them.",
      rating: "4",
    },
    {
      id: 3,
      image: "/images/client.png",
      name: "Leslie Alexander",
      jobs: "Marketing Coordinator",
      Evaluation:
        "via completely transformed our digital marketing strategy. Their creative approach to social media and influencer partnerships helped us reach new audiences we hadn't tapped into before. Our engagement rates have increased by 150% since working with them.",
      rating: "4",
    },
  ];

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
          {clients.map((client, index) => (
            <SwiperSlide key={client.id}>
              <div className="relative overflow-hidden min-h-[360px]">
                <div
                  ref={(el) => (imageRefs.current[index] = el)}
                  className="w-32 h-32 rounded-full m-auto overflow-hidden"
                >
                  <Image
                    src={client.image}
                    alt={client.name}
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
                        {client.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{client.jobs}</p>
                      <div className="flex justify-center mb-4">
                        <StarRating rating={client.rating} />
                      </div>
                      <p className="text-gray-700">{client.Evaluation}</p>
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
