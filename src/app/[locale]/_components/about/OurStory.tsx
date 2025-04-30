"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function OurStory() {
  return (
    <div className="w-full pb-[80px] overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between mx-6 md:mx-[80px] gap-10">
        <motion.div
          className="max-w-[676px] flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[36px] md:text-[48px] font-bold text-primary">
            Our Story
          </h1>
          <p className="text-[20px] md:text-[24px] font-medium text-[#FFFFFF]">
            Once upon a time in the vibrant city of Cairo, four visionaries came
            together with a shared passion for transforming ideas into impactful
            stories. Their collective dream was to establish a marketing and
            media production agency that would redefine industry standards and
            set new benchmarks for creativity.
          </p>
        </motion.div>
        <motion.div
          className="relative w-full md:w-[500px] h-[300px] md:h-[450px]"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/about/ourStory.png"
            alt="about"
            fill
            className="object-cover object-center rounded-lg"
            priority
          />
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute left-0 right-0 w-[60px] sm:w-[80px] md:w-[99px] h-[50px] sm:h-[65px] md:h-[80px] grid grid-cols-5 grid-rows-5 gap-[.12px]">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="w-[2.5px] sm:w-[3px] md:w-[3.85px] h-[2.5px] sm:h-[3px] md:h-[3.85px] bg-gray-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "2s",
                animationIterationCount: "infinite",
              }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default OurStory;
