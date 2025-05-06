"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";
import { MissionAndVisionResponse } from "@/types/about";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { Languages } from "@/constants/enums";

function OurVision() {
  const { locale } = useParams();
  const { data, loading, error } = useFetch<MissionAndVisionResponse>(
    "/items/mission_and_vision",
    {
      fields: "*.*",
    }
  );
  const visionData = data?.data[0];

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading vision data</div>;
  if (!visionData) return null;

  const title = locale === Languages.ENGLISH ? "Our Vision" : "رؤيتنا";
  const text =
    locale === Languages.ENGLISH ? visionData.text_en : visionData.text;

  // Extract only the vision part from the HTML content
  const visionText = text.split(
    locale === Languages.ENGLISH ? "<h3>Our Vision</h3>" : "<h3>رؤيتنا</h3>"
  )[1];

  return (
    <div className="py-[80px]">
      <div className="flex flex-col lg:flex-row items-center justify-between mx-6 md:mx-[80px] gap-10">
        <motion.div
          className="max-w-[676px] flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-[36px] md:text-[48px] font-bold text-primary">
            {title}
          </h3>
          <div
            className="text-[20px] md:text-[24px] font-medium text-[#FFFFFF]"
            dangerouslySetInnerHTML={{ __html: visionText }}
          />
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={visionData.image2.data.full_url}
            alt={title}
            width={200}
            height={210}
            className="md:w-[323px] md:h-[333px]"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default OurVision;
