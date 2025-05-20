"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { MissionAndVisionResponse } from "@/types/about";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { Languages } from "@/constants/enums";

function OurMission() {
  const { locale } = useParams();
  const { data, loading, error } = useFetch<MissionAndVisionResponse>(
    "/items/mission_and_vision",
    {
      fields: "*.*",
    }
  );
  const missionData = data?.data[0];

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading mission data</div>;
  if (!missionData) return null;

  const title =
    locale === Languages.ENGLISH ? missionData.title_en : missionData.title;
  const text =
    locale === Languages.ENGLISH ? missionData.text_en : missionData.text;

  // Extract only the mission part from the HTML content
  const missionText = text.split(
    locale === Languages.ENGLISH ? "<h3>Our Vision</h3>" : "<h3>رؤيتنا</h3>"
  )[0];

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-0 right-0 w-[60px] sm:w-[80px] md:w-[99px] h-[50px] sm:h-[65px] md:h-[80px] grid grid-cols-5 grid-rows-5 gap-[.12px]">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="w-[2.5px] sm:w-[3px] md:w-[3.85px] h-[2.5px] sm:h-[3px] md:h-[3.85px] bg-gray-400 rounded-full"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between mx-4 sm:mx-6 md:mx-[80px] gap-6 sm:gap-8 md:gap-10 pt-[40px] sm:pt-[60px] md:pt-[80px]">
        <motion.div
          className="w-full md:w-auto relative"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[240px] xl:w-[280px] h-[200px] sm:h-[240px] xl:h-[280px] bg-primary -rotate-[15deg] transform-gpu"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              zIndex: -1,
            }}
          />
          <Image
            src={missionData.image.data.full_url}
            alt={title}
            width={200}
            height={320}
            className="w-[150px] sm:w-[180px] xl:w-full h-auto mx-auto md:mx-0 relative z-10"
          />
        </motion.div>
        <motion.div
          className={`text-center xl:text-start ${
            locale === Languages.ENGLISH ? "ml-20" : "mr-10"
          }`}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
        >
          <h2 className="text-[36px] xl:text-[48px] font-bold text-primary">
            {title}
          </h2>
          <div
            className="text-[14px] sm:text-[20px] xl:text-[24px] font-medium text-[#FFFFFF]  mt-4 sm:mt-6"
            dangerouslySetInnerHTML={{ __html: missionText }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default OurMission;
