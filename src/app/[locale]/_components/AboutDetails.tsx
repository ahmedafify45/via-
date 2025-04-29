"use client";
import Image from "next/image";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

function AnimatedNumber({ value, plus, delay }: { value: number; plus: string; delay: number }) {
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
      <span className="text-primary">{plus}</span>
    </motion.span>
  );
}

function AboutDetails() {
  const details = [
    {
      number: 10,
      title: "Years of Experience",
      plus: "+",
    },
    {
      number: 250,
      title: "Projects Completed",
      plus: "+",
    },
    {
      number: 250,
      title: "Projects Completed",
      plus: "+",
    },
    {
      number: 95,
      title: "Client Satisfaction",
      plus: "+",
    },
  ];

  return (
    <div className="bg-white">
      <div className="w-full">
        <Image
          src="/images/aboutdetails.png"
          alt="details.png"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between px-4 md:px-8 lg:px-[89px] py-8 md:py-12 lg:py-[45px] gap-8 md:gap-4 lg:gap-0">
        {details.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-4xl lg:text-6xl lg:text-[82px] font-bold">
              <AnimatedNumber 
                value={item.number} 
                plus={item.plus} 
                delay={index * 0.3}
              />
            </p>
            <p className="text-sm md:text-base lg:text-lg">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutDetails;

