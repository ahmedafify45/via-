import Image from "next/image";

function OurVision() {
  return (
    <div className=" py-[80px] ">
      <div className="flex flex-col lg:flex-row items-center justify-between mx-6 md:mx-[80px] gap-10">
        <div className="max-w-[676px] flex-1 text-center md:text-left ">
          <h3 className="text-[36px] md:text-[48px] font-bold text-primary">
            Our Vision
          </h3>
          <p className="text-[20px] md:text-[24px] font-medium text-[#FFFFFF]">
            Embracing the spirit of collaboration, we envision a future where
            every dream is realized and flourishes. And become the pioneer
            gateway for unprecedented growth and influence in the MEA markets
            over the next 10 years.
          </p>
        </div>
        <div className="relative">
          <Image
            src="/images/about/eyes.png"
            alt="about"
            width={200}
            height={210}
            className="md:w-[323px] md:h-[333px]"
          />
        </div>
      </div>
    </div>
  );
}

export default OurVision;
