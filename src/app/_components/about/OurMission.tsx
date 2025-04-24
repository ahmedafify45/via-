import Image from "next/image";

function OurMission() {
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
      <div className="flex flex-col md:flex-row items-center justify-between mx-4 sm:mx-6 md:mx-[80px] gap-6 sm:gap-8 md:gap-10 pt-[40px] sm:pt-[60px] md:pt-[80px]">
        <div className="w-full md:w-auto">
          <Image
            src="/images/about/Our_Mission.png"
            alt="ourMission"
            width={200}
            height={320}
            className="w-[150px] sm:w-[180px] md:w-[200px] h-auto mx-auto md:mx-0"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-primary">
            Our Mission
          </h2>
          <p className="text-[16px] sm:text-[20px] md:text-[24px] font-medium text-[#FFFFFF] max-w-[567px] mt-4 sm:mt-6">
            Empowering Dreams, Guiding Paths: We are dedicated to assisting our
            customers in navigating the smartest route towards their
            aspirations. Through active participation and thoughtful guidance,
            we provide the essential tools and resources for their journey,
            ensuring every ambition is within reach.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurMission;
