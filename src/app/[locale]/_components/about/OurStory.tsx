"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { AboutStoryResponse } from "@/types/about";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import Loading from "@/components/Loading";

function OurStory() {
  const params = useParams();
  const locale = params.locale as string;
  const { data, loading, error } = useFetch<AboutStoryResponse>(
    "/items/about_story",
    {
      fields: "*.*",
    }
  );

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading story</div>;
  if (!data?.data?.[0]) return null;

  const story = data.data[0];

  return (
    <div className="w-full pb-[80px] overflow-hidden">
      <div className="flex flex-col xl:flex-row items-center justify-between mx-6 xl:mx-[80px] gap-10">
        <motion.div
          className="max-w-full flex-1 text-center xl:text-start order-2 xl:order-1"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[36px] xl:text-[48px] font-bold text-primary ">
            {locale === Languages.ARABIC ? story.title : story.title_en}
          </h1>
          <div
            className="text-sm sm:text-[20px] xl:text-[24px] font-normal lg:font-medium text-[#FFFFFF]"
            dangerouslySetInnerHTML={{
              __html: locale === "ar" ? story.text : story.text_en,
            }}
          />
        </motion.div>
        <motion.div
          className="relative w-[250px] sm:w-[350px] xl:w-[500px] h-[250px] sm:h-[350px] xl:h-[450px] order-1 xl:order-2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={story.image.data.full_url}
            alt={locale === Languages.ARABIC ? story.title : story.title_en}
            fill
            className="object-cover object-center rounded-lg"
            priority
          />
        </motion.div>
      </div>
      <div className="relative ">
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
