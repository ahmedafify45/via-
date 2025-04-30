"use client";
import Image from "next/image";
import { motion } from "framer-motion";

function OurVision() {
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
            Our Vision
          </h3>
          <p className="text-[20px] md:text-[24px] font-medium text-[#FFFFFF]">
            Embracing the spirit of collaboration, we envision a future where
            every dream is realized and flourishes. And become the pioneer
            gateway for unprecedented growth and influence in the MEA markets
            over the next 10 years.
          </p>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/about/eyes.png"
            alt="about"
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
