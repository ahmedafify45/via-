"use client";
import Image from "next/image";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function AnimatedNumber({
  value,
  extra,
  delay,
}: {
  value: number;
  extra: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) => {
    return Math.floor(current);
  });

  useEffect(() => {
    if (isInView) {
      spring.set(0);
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span>{display}</motion.span>
      <span className="text-primary">{extra}</span>
    </motion.span>
  );
}

function AboutDetails() {
  const imageRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const locale = params?.locale as string;
  const { data, loading, error } = useFetch<{
    data: Array<{
      id: number;
      number: string;
      name: string;
      name_en: string;
      extra: string;
    }>;
  }>("/items/counters");

  useEffect(() => {
    if (imageRef.current) {
      const image = imageRef.current;

      // Create a door-like effect using clip-path
      gsap.fromTo(
        image,
        {
          clipPath: "inset(0% 50% 0% 50%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading counters</div>;
  if (!data?.data) return null;

  return (
    <div className="bg-white">
      <div className="w-full overflow-hidden mt-[80px]" ref={imageRef}>
        <Image
          src="/images/aboutdetails.png"
          alt="details.png"
          width={1920}
          height={1080}
          className="w-full h-auto "
          priority
        />
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between px-4 md:px-8 lg:px-[89px] py-8 md:py-12 lg:py-[45px] gap-8 md:gap-4 lg:gap-0">
        {data.data.map((item, index) => (
          <div key={item.id} className="text-center">
            <p className="text-4xl lg:text-6xl lg:text-[82px] font-bold">
              <AnimatedNumber
                value={Number(item.number)}
                extra={item.extra}
                delay={index * 0.3}
              />
            </p>
            <p className="text-sm md:text-base lg:text-lg">
              {locale === "ar" ? item.name : item.name_en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutDetails;
